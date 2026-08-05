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
  diameter: number;
  length: number;
}

interface ViewerProps {
  items: RenderMember[];
  joints: RenderJoint[];
  machining: RenderMachining[];
  /** 相机注视高度（一般取框架半高） */
  focusY: number;
  onSelect?: (sel: Selection | null) => void;
  selection?: Selection | null;
}

const SELECT_COLOR = 0x1e6fff;

export function Viewer({ items, joints, machining, focusY, onSelect, selection }: ViewerProps) {
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
    dimLine: THREE.LineSegments;
    dimLabel: CSS2DObject;
    dimLabelEl: HTMLDivElement;
  } | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8edf4);   // 嘉立创浅蓝灰画布

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 1, 10000);
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

    // 尺寸标注（主线+两端引线 + 蓝色标签），选中构件时显示
    const dimGroup = new THREE.Group();
    dimGroup.visible = false;
    const dimGeom = new THREE.BufferGeometry();
    dimGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(18), 3));
    const dimLine = new THREE.LineSegments(dimGeom, new THREE.LineBasicMaterial({ color: SELECT_COLOR }));
    dimLine.frustumCulled = false;
    dimGroup.add(dimLine);
    const dimLabelEl = document.createElement('div');
    Object.assign(dimLabelEl.style, {
      background: '#1e6fff', color: '#fff', padding: '2px 10px', borderRadius: '10px',
      fontSize: '12px', fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap',
    });
    const dimLabel = new CSS2DObject(dimLabelEl);
    dimGroup.add(dimLabel);
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
      dimGroup, dimLine, dimLabel, dimLabelEl,
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
      mesh.userData.sel = { type: 'member', id: item.id } satisfies Selection;
      mesh.userData.member = item;
      ctx.group.add(mesh);
      ctx.memberMeshes.set(item.id, mesh);

      // 棱线：型材轮廓感的关键（嘉立创的槽口暗线效果）
      const edges = new THREE.LineSegments(cached.edges, edgeMat);
      edges.rotation.copy(mesh.rotation);
      edges.position.copy(mesh.position);
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

    // 孔位标记：橙色半透明圆柱，X-ray 透视（加工特征可视化）
    const holeMat = new THREE.MeshStandardMaterial({
      color: 0xff7a1a, metalness: 0.2, roughness: 0.4,
      transparent: true, opacity: 0.8, depthTest: false,
    });
    for (const mc of machining) {
      const cyl = new THREE.Mesh(
        new THREE.CylinderGeometry(mc.diameter / 2, mc.diameter / 2, mc.length, 16), holeMat);
      if (mc.axis === 'x') cyl.rotation.z = Math.PI / 2;
      else if (mc.axis === 'z') cyl.rotation.x = Math.PI / 2;
      cyl.position.set(...mc.position);
      cyl.renderOrder = 998;
      ctx.group.add(cyl);
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

    for (const [id, mesh] of ctx.memberMeshes) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (id === selMemberId) {
        mat.color.setHex(SELECT_COLOR);
        mat.metalness = 0.4;
        mat.roughness = 0.35;
        mat.emissive.setHex(0x0a2a66);
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

    // 尺寸标注：选中构件时沿构件轴显示（主线 + 两端引线 + mm 标签）
    const item = selMemberId ? items.find((i) => i.id === selMemberId) : null;
    if (item) {
      const s = item.section.size[0];
      const p = new THREE.Vector3(...item.position);
      const along = new THREE.Vector3(
        item.axis === 'x' ? 1 : 0, item.axis === 'y' ? 1 : 0, item.axis === 'z' ? 1 : 0);
      const offset = item.axis === 'y'
        ? new THREE.Vector3(Math.sign(p.x || 1) * s * 1.6, 0, 0)
        : new THREE.Vector3(0, s * 1.6, 0);
      const e1 = p.clone().addScaledVector(along, -item.length / 2);
      const e2 = p.clone().addScaledVector(along, item.length / 2);
      const o1 = e1.clone().add(offset);
      const o2 = e2.clone().add(offset);
      const pos = ctx.dimLine.geometry.getAttribute('position') as THREE.BufferAttribute;
      const pts = [o1, o2, e1, o1, e2, o2];
      pts.forEach((v, i) => pos.setXYZ(i, v.x, v.y, v.z));
      pos.needsUpdate = true;
      ctx.dimLine.geometry.computeBoundingSphere();
      ctx.dimLabel.position.copy(o1.clone().add(o2).multiplyScalar(0.5).add(offset.clone().multiplyScalar(0.35)));
      ctx.dimLabelEl.textContent = `${item.length} mm`;
      ctx.dimGroup.visible = true;
    } else {
      ctx.dimGroup.visible = false;
    }
  }, [selection, items]);

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
