import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
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
  position: [number, number, number];
  beamAxis: 'x' | 'z';
  outward: 1 | -1;
  ySide: 1 | -1;
  /** 隐藏式连接件→X-ray青色显示；否则画角码实体 */
  hidden: boolean;
  /** 立柱截面边长，决定角码/螺栓尺寸 */
  size: number;
}

interface ViewerProps {
  items: RenderMember[];
  joints: RenderJoint[];
  /** 相机注视高度（一般取框架半高） */
  focusY: number;
  /** 点击构件回调（null=点空白取消选择） */
  onSelect?: (member: RenderMember | null) => void;
  selectedId?: string | null;
}

const SELECT_COLOR = 0x1e6fff;

export function Viewer({ items, joints, focusY, onSelect, selectedId }: ViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    group: THREE.Group;
    raycaster: THREE.Raycaster;
    memberMeshes: Map<string, THREE.Mesh>;
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);

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
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    dir.shadow.camera.left = -1500;
    dir.shadow.camera.right = 1500;
    dir.shadow.camera.top = 1500;
    dir.shadow.camera.bottom = -1500;
    dir.shadow.camera.far = 4000;
    dir.shadow.bias = -0.0005;
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(8000, 8000),
      new THREE.ShadowMaterial({ opacity: 0.15 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

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

    renderer.setAnimationLoop(() => renderer.render(scene, camera));

    const group = new THREE.Group();
    scene.add(group);

    // 点选构件
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
      const meshes = [...ctx2.memberMeshes.values()];
      const hits = raycaster.intersectObjects(meshes, false);
      const hit = hits[0]?.object as THREE.Mesh | undefined;
      const member = hit ? (hit.userData.member as RenderMember) : null;
      onSelectRef.current?.(member);
    });

    const ro = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    ro.observe(mount);

    ctxRef.current = { scene, camera, renderer, controls, group, raycaster, memberMeshes: new Map() };

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      pmrem.dispose();
      mount.removeChild(renderer.domElement);
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
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.member = item;
      ctx.group.add(mesh);
      ctx.memberMeshes.set(item.id, mesh);

      // 棱线：型材轮廓感的关键（嘉立创的槽口暗线效果）
      const edges = new THREE.LineSegments(cached.edges, edgeMat);
      edges.rotation.copy(mesh.rotation);
      edges.position.copy(mesh.position);
      ctx.group.add(edges);
    }

    // 连接件渲染
    const steel = new THREE.MeshStandardMaterial({ color: 0x8a8f96, metalness: 0.9, roughness: 0.4 });
    const xray = new THREE.MeshStandardMaterial({
      color: 0x2ec4d6, metalness: 0.3, roughness: 0.3,
      transparent: true, opacity: 0.65, depthTest: false,   // X-ray：隐藏式连接件透视可见
    });

    for (const j of joints) {
      const s = j.size;
      const t = Math.max(3, s * 0.12);
      const [jx, jy, jz] = j.position;

      if (j.hidden) {
        const len = s * 1.4;
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(s * 0.14, s * 0.14, len, 16), xray);
        if (j.beamAxis === 'x') cyl.rotation.z = Math.PI / 2;
        else cyl.rotation.x = Math.PI / 2;
        cyl.position.set(jx, jy, jz);
        cyl.renderOrder = 999;
        ctx.group.add(cyl);
        continue;
      }

      const beamFaceY = jy + j.ySide * (s / 2);
      const vPlate = new THREE.Mesh(new THREE.BoxGeometry(
        j.beamAxis === 'x' ? t : s * 0.8, s * 0.8, j.beamAxis === 'x' ? s * 0.8 : t), steel);
      const vOff = j.outward * (t / 2);
      vPlate.position.set(
        j.beamAxis === 'x' ? jx - vOff : jx,
        beamFaceY + j.ySide * (s * 0.4),
        j.beamAxis === 'x' ? jz : jz - vOff,
      );
      vPlate.castShadow = true;
      ctx.group.add(vPlate);

      const hPlate = new THREE.Mesh(new THREE.BoxGeometry(s * 0.8, t, s * 0.8), steel);
      hPlate.position.set(
        j.beamAxis === 'x' ? jx - j.outward * (s * 0.4) : jx,
        beamFaceY + j.ySide * (t / 2),
        j.beamAxis === 'x' ? jz : jz - j.outward * (s * 0.4),
      );
      hPlate.castShadow = true;
      ctx.group.add(hPlate);
    }

    ctx.controls.target.set(0, focusY, 0);
    ctx.controls.update();
  }, [items, joints, focusY]);

  // 选中高亮（嘉立创蓝）
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    for (const [id, mesh] of ctx.memberMeshes) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (id === selectedId) {
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
  }, [selectedId]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,.92)', padding: '7px 18px', borderRadius: 20,
        fontSize: 12, color: '#555', boxShadow: '0 2px 8px rgba(0,0,0,.08)', whiteSpace: 'nowrap',
      }}>
        左键旋转 · 右键平移 · 滚轮缩放 · 点击构件查看详情
      </div>
    </div>
  );
}
