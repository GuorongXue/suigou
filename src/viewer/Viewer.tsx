import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { Section } from '../knowledge/types';
import type { Axis } from '../engine/types';
import { buildSectionShape, profileGeometry } from './profileGeometry';

export interface RenderMember {
  id: string;
  role: string;
  section: Section;
  length: number;
  position: [number, number, number];
  axis: Axis;
}

export interface RenderJoint {
  id: string;
  connectorId: string;
  position: [number, number, number];
  beamAxis: 'x' | 'z';
  outward: 1 | -1;
  ySide: 1 | -1;
  /** 隐藏式连接件→X-ray青色显示；否则画角码实体 */
  hidden: boolean;
  /** 立柱截面边长，决定角码/螺栓尺寸 */
  size: number;
}

export type Selection = { type: 'member'; id: string } | { type: 'joint'; id: string };

export interface RenderMachining {
  position: [number, number, number];
  axis: Axis;
  dir: 1 | -1;
  d: number;
  D?: number;
}

/** 尺寸标注：主线 a→b 平移 offset，两端引线，中点挂标签 */
export interface RenderDim {
  a: [number, number, number];
  b: [number, number, number];
  offset: [number, number, number];
  label: string;
}

interface ViewerProps {
  items: RenderMember[];
  joints: RenderJoint[];
  machining: RenderMachining[];
  dims: RenderDim[];
  /** 相机注视高度（一般取框架半高） */
  focusY: number;
  onSelect?: (sel: Selection | null) => void;
  selection?: Selection | null;
  /** 校验问题构件（橙色警示） */
  warnMemberIds?: string[];
}

const SELECT_COLOR = 0x1e6fff;
const WARN_COLOR = 0xe8833a;

export function Viewer({ items, joints, machining, dims, focusY, onSelect, selection, warnMemberIds }: ViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    group: THREE.Group;
    raycaster: THREE.Raycaster;
    memberMeshes: Map<string, THREE.Mesh>;
    jointMeshes: Map<string, THREE.Mesh[]>;
    dimGroup: THREE.Group;
  } | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8edf4);   // 嘉立创浅蓝灰画布

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 5, 10000);
    camera.position.set(1000, 780, 1250);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);

    // 尺寸标签渲染层（HTML overlay）
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    mount.appendChild(labelRenderer.domElement);

    // 环境反射：铝材质感的关键
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 120;      // 缩放限制：避免过近穿模/过远失真
    controls.maxDistance = 4500;
    controls.mouseButtons = {                     // 对齐嘉立创：左键旋转 右键平移
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    const dir = new THREE.DirectionalLight(0xffffff, 2.0);
    dir.position.set(600, 1000, 400);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // 双层网格 + 红绿轴线（嘉立创画布同款）
    const gridMinor = new THREE.GridHelper(6000, 120, 0xd0d7e2, 0xd0d7e2);
    (gridMinor.material as THREE.Material).transparent = true;
    (gridMinor.material as THREE.Material).opacity = 0.5;
    scene.add(gridMinor);
    const gridMajor = new THREE.GridHelper(6000, 24, 0xb8c2d2, 0xb8c2d2);
    scene.add(gridMajor);

    const axisMat = (color: number) => new THREE.LineBasicMaterial({ color });
    const xAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints(
      [new THREE.Vector3(-3000, 0.5, 0), new THREE.Vector3(3000, 0.5, 0)]), axisMat(0xe04a3a));
    const zAxis = new THREE.Line(new THREE.BufferGeometry().setFromPoints(
      [new THREE.Vector3(0, 0.5, -3000), new THREE.Vector3(0, 0.5, 3000)]), axisMat(0x3aa05a));
    scene.add(xAxis, zAxis);

    // 尺寸标注容器（内容由 dims prop 驱动重建）
    const dimGroup = new THREE.Group();
    scene.add(dimGroup);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    });

    const group = new THREE.Group();
    scene.add(group);

    // 点选构件/连接件
    const raycaster = new THREE.Raycaster();
    let downXY: [number, number] | null = null;
    renderer.domElement.addEventListener('pointerdown', (e) => { downXY = [e.clientX, e.clientY]; });
    renderer.domElement.addEventListener('pointerup', (e) => {
      if (!downXY) return;
      const moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]);
      downXY = null;
      if (moved > 5) return;   // 拖动旋转不算点击
      const rect = renderer.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const ctx2 = ctxRef.current;
      if (!ctx2) return;
      const targets: THREE.Object3D[] = [
        ...ctx2.memberMeshes.values(),
        ...[...ctx2.jointMeshes.values()].flat(),
      ];
      const hits = raycaster.intersectObjects(targets, false);
      const hit = hits[0]?.object;
      onSelectRef.current?.((hit?.userData.sel as Selection | undefined) ?? null);
    });

    const ro = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      labelRenderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    ro.observe(mount);

    ctxRef.current = {
      scene, camera, renderer, controls, group, raycaster,
      memberMeshes: new Map(), jointMeshes: new Map(),
      dimGroup,
    };

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      pmrem.dispose();
      mount.removeChild(renderer.domElement);
      mount.removeChild(labelRenderer.domElement);
      ctxRef.current = null;
    };
  }, []);

  // 重建构件与连接件
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    for (const child of [...ctx.group.children]) {
      ctx.group.remove(child);
      const m = child as THREE.Mesh | THREE.LineSegments;
      m.geometry?.dispose();
    }
    ctx.memberMeshes.clear();
    ctx.jointMeshes.clear();

    // 同截面同长度共享一份挤出几何（渲染实验验证的性能路线）
    const geomCache = new Map<string, { geom: THREE.ExtrudeGeometry; edges: THREE.EdgesGeometry }>();
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x6b7280, transparent: true, opacity: 0.35 });

    for (const item of items) {
      const key = `${item.section.id}:${item.length}`;
      let cached = geomCache.get(key);
      if (!cached) {
        const geom = profileGeometry(buildSectionShape(item.section), item.length);
        cached = { geom, edges: new THREE.EdgesGeometry(geom, 25) };
        geomCache.set(key, cached);
      }
      const alu = new THREE.MeshStandardMaterial({
        color: 0xc4c9cf, metalness: 0.9, roughness: 0.38, envMapIntensity: 0.9,
      });
      const mesh = new THREE.Mesh(cached.geom, alu);
      if (item.axis === 'x') mesh.rotation.y = Math.PI / 2;
      else if (item.axis === 'y') mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(...item.position);
      // 梁端与柱面共面会 z-fighting，渲染层缩 0.3mm（不影响下料数据）
      if (item.role !== 'post') mesh.scale.z = (item.length - 0.3) / item.length;
      mesh.userData.sel = { type: 'member', id: item.id } satisfies Selection;
      mesh.userData.member = item;
      ctx.group.add(mesh);
      ctx.memberMeshes.set(item.id, mesh);

      // 棱线：型材轮廓感的关键（嘉立创的槽口暗线效果）
      const edges = new THREE.LineSegments(cached.edges, edgeMat);
      edges.rotation.copy(mesh.rotation);
      edges.position.copy(mesh.position);
      edges.scale.copy(mesh.scale);
      ctx.group.add(edges);
    }

    for (const j of joints) {
      const s = j.size;
      const t = Math.max(3, s * 0.12);
      const [jx, jy, jz] = j.position;
      const meshes: THREE.Mesh[] = [];
      const sel: Selection = { type: 'joint', id: j.id };

      if (j.hidden) {
        const xray = new THREE.MeshStandardMaterial({
          color: 0x2ec4d6, metalness: 0.3, roughness: 0.3,
          transparent: true, opacity: 0.65, depthTest: false,   // X-ray：隐藏式连接件透视可见
        });
        const len = s * 1.4;
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(s * 0.14, s * 0.14, len, 16), xray);
        if (j.beamAxis === 'x') cyl.rotation.z = Math.PI / 2;
        else cyl.rotation.x = Math.PI / 2;
        cyl.position.set(jx, jy, jz);
        cyl.renderOrder = 999;
        cyl.userData.sel = sel;
        ctx.group.add(cyl);
        meshes.push(cyl);
      } else {
        const steel = new THREE.MeshStandardMaterial({ color: 0x8a8f96, metalness: 0.9, roughness: 0.4 });
        const beamFaceY = jy + j.ySide * (s / 2);
        const vPlate = new THREE.Mesh(new THREE.BoxGeometry(
          j.beamAxis === 'x' ? t : s * 0.8, s * 0.8, j.beamAxis === 'x' ? s * 0.8 : t), steel);
        const vOff = j.outward * (t / 2);
        vPlate.position.set(
          j.beamAxis === 'x' ? jx - vOff : jx,
          beamFaceY + j.ySide * (s * 0.4),
          j.beamAxis === 'x' ? jz : jz - vOff,
        );
        vPlate.userData.sel = sel;
        ctx.group.add(vPlate);
        meshes.push(vPlate);

        const hPlate = new THREE.Mesh(new THREE.BoxGeometry(s * 0.8, t, s * 0.8), steel);
        hPlate.position.set(
          j.beamAxis === 'x' ? jx - j.outward * (s * 0.4) : jx,
          beamFaceY + j.ySide * (t / 2),
          j.beamAxis === 'x' ? jz : jz - j.outward * (s * 0.4),
        );
        hPlate.userData.sel = sel;
        ctx.group.add(hPlate);
        meshes.push(hPlate);
      }
      ctx.jointMeshes.set(j.id, meshes);
    }

    // 孔口圆片：深色孔面贴在构件表面（真实孔开口观感，嘉立创式）
    const holeMat = new THREE.MeshStandardMaterial({ color: 0x23272d, metalness: 0.2, roughness: 0.85 });
    const boreRim = new THREE.MeshStandardMaterial({ color: 0x9aa0a8, metalness: 0.7, roughness: 0.45 });
    const orient = (mesh: THREE.Mesh, axis: Axis, dir: 1 | -1) => {
      if (axis === 'y') mesh.rotation.x = dir === 1 ? -Math.PI / 2 : Math.PI / 2;
      else if (axis === 'x') mesh.rotation.y = dir === 1 ? Math.PI / 2 : -Math.PI / 2;
      else if (dir === -1) mesh.rotation.y = Math.PI;
    };
    for (const h of machining) {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(h.d / 2, 24), holeMat);
      orient(disc, h.axis, h.dir);
      disc.position.set(...h.position);
      ctx.group.add(disc);
      if (h.D) {   // 沉头台阶环
        const ring = new THREE.Mesh(new THREE.RingGeometry(h.d / 2, h.D / 2, 24), boreRim);
        orient(ring, h.axis, h.dir);
        ring.position.set(...h.position);
        ctx.group.add(ring);
      }
    }

    ctx.controls.target.set(0, focusY, 0);
    ctx.controls.update();
  }, [items, joints, machining, focusY]);

  // 选中高亮 + 尺寸标注
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const selMemberId = selection?.type === 'member' ? selection.id : null;
    const selJointId = selection?.type === 'joint' ? selection.id : null;
    const warnSet = new Set(warnMemberIds ?? []);

    for (const [id, mesh] of ctx.memberMeshes) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (id === selMemberId) {
        mat.color.setHex(SELECT_COLOR);
        mat.metalness = 0.4;
        mat.roughness = 0.35;
        mat.emissive.setHex(0x0a2a66);
      } else if (warnSet.has(id)) {   // 校验问题构件：橙色警示
        mat.color.setHex(WARN_COLOR);
        mat.metalness = 0.5;
        mat.roughness = 0.4;
        mat.emissive.setHex(0x4a2408);
      } else {
        mat.color.setHex(0xc4c9cf);
        mat.metalness = 0.9;
        mat.roughness = 0.38;
        mat.emissive.setHex(0x000000);
      }
    }

    for (const [id, meshes] of ctx.jointMeshes) {
      for (const mesh of meshes) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissive.setHex(id === selJointId ? 0x1e6fff : 0x000000);
        mat.emissiveIntensity = id === selJointId ? 0.6 : 1;
      }
    }
  }, [selection, items, warnMemberIds]);

  // 尺寸标注渲染（dims 数组驱动：主线 + 两端引线 + 蓝色标签）
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    for (const child of [...ctx.dimGroup.children]) {
      ctx.dimGroup.remove(child);
      if (child instanceof CSS2DObject) child.element.remove();
      else (child as THREE.LineSegments).geometry?.dispose();
    }

    const mat = new THREE.LineBasicMaterial({ color: SELECT_COLOR });
    for (const d of dims) {
      const a = new THREE.Vector3(...d.a);
      const b = new THREE.Vector3(...d.b);
      const off = new THREE.Vector3(...d.offset);
      const o1 = a.clone().add(off);
      const o2 = b.clone().add(off);
      const geom = new THREE.BufferGeometry().setFromPoints([o1, o2, a, o1, b, o2]);
      const line = new THREE.LineSegments(geom, mat);
      line.frustumCulled = false;
      ctx.dimGroup.add(line);

      const el = document.createElement('div');
      Object.assign(el.style, {
        background: '#1e6fff', color: '#fff', padding: '2px 10px', borderRadius: '10px',
        fontSize: '12px', fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap',
      });
      el.textContent = d.label;
      const label = new CSS2DObject(el);
      label.position.copy(o1.clone().add(o2).multiplyScalar(0.5).add(off.clone().multiplyScalar(0.35)));
      ctx.dimGroup.add(label);
    }
  }, [dims]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ position: 'relative', width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,.92)', padding: '7px 18px', borderRadius: 20,
        fontSize: 12, color: '#555', boxShadow: '0 2px 8px rgba(0,0,0,.08)', whiteSpace: 'nowrap',
      }}>
        左键旋转 · 右键平移 · 滚轮缩放 · 点击构件/连接件查看，选中构件可改尺寸
      </div>
    </div>
  );
}
