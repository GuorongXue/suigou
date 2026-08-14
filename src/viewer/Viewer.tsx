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
  /** 斜撑倾角（绕Z） */
  tilt?: number;
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

export interface RenderPanel {
  material: string;
  boxSize: [number, number, number];
  position: [number, number, number];
  mode?: string;
}

export interface RenderAccessory {
  kind: string;
  position: [number, number, number];
  /** 长条类附件长度（LED 灯条） */
  lengthMm?: number;
  /** 盒体类附件尺寸（抽屉盒） */
  boxSize?: [number, number, number];
}

export interface RenderMountPoint {
  position: [number, number, number];
  /** 固定点编号（同 Mount 共用，如 M3） */
  label?: string;
  /** 悬停说明：固定方式+紧固件 */
  note?: string;
}

/** 尺寸标注：主线 a→b 平移 offset，两端引线，中点挂标签 */
export interface RenderDim {
  a: [number, number, number];
  b: [number, number, number];
  offset: [number, number, number];
  label: string;
}

/** 件号球标（图纸模式：图与切割清单的对照桥梁） */
export interface RenderBubble {
  position: [number, number, number];
  label: string;
}

interface ViewerProps {
  items: RenderMember[];
  joints: RenderJoint[];
  machining: RenderMachining[];
  panels: RenderPanel[];
  accessories: RenderAccessory[];
  mountPoints: RenderMountPoint[];
  dims: RenderDim[];
  /** 图纸模式：白底线框风+伪正交投影（窄 fov） */
  drawing?: boolean;
  /** 件号球标（图纸模式） */
  bubbles?: RenderBubble[];
  /** 视图切换请求（seq 递增触发） */
  viewRequest?: { dir: [number, number, number]; seq: number } | null;
  /** 相机注视高度（一般取框架半高） */
  focusY: number;
  onSelect?: (sel: Selection | null) => void;
  selection?: Selection | null;
  /** 校验问题构件（橙色警示） */
  warnMemberIds?: string[];
  /** 型材颜色：silver/black/gold → 轮廓材质颜色 */
  profileColor?: 'silver' | 'black' | 'gold';
}

const SELECT_COLOR = 0x1e6fff;
const WARN_COLOR = 0xe8833a;
/** 型材颜色调色板（阳极氧化/哑光/香槟） */
const PROFILE_COLORS: Record<string, number> = { silver: 0xc4c9cf, black: 0x2a2d3a, gold: 0xc9a84c };

/** 程序化纹理缓存（避免每帧重绘 canvas） */
const TEX_CACHE = new Map<string, THREE.CanvasTexture>();
function tex(key: string, size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void) {
  const cached = TEX_CACHE.get(key);
  if (cached) return cached;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  draw(ctx, size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  TEX_CACHE.set(key, t);
  return t;
}

const PEG_CACHE = new Map<number, TexSet>();
function pegboardTextures(size = 512): TexSet {
  const hit = PEG_CACHE.get(size);
  if (hit) return hit;
  const step = size / 16, r = step * 0.1;     // 25mm 孔距，Φ5mm 孔
  const color = tex(`pegboard-c-${size}`, size, (ctx, s) => {
    ctx.fillStyle = '#cfb896'; ctx.fillRect(0, 0, s, s);            // MDF 底色
    for (let i = 0; i < s * 8; i++) {                            // 细微颗粒
      const v = 180 + Math.random() * 60 | 0;
      ctx.fillStyle = `rgba(${v},${v - 30},${v - 60},0.04)`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 1, 1);
    }
    for (let y = step / 2; y < s; y += step) for (let x = step / 2; x < s; x += step) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 1.3); // 孔内黑暗（穿透感）
      g.addColorStop(0, '#2a1f10'); g.addColorStop(0.7, '#3d2c18'); g.addColorStop(1, '#5a4530');
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.lineWidth = r * 0.35; ctx.strokeStyle = '#ddc9a3'; ctx.stroke();
    }
  });
  const bump = tex(`pegboard-b-${size}`, size, (ctx, s) => {
    ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, s, s);
    for (let y = step / 2; y < s; y += step) for (let x = step / 2; x < s; x += step) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 1.5);
      g.addColorStop(0, '#000000'); g.addColorStop(0.8, '#303030'); g.addColorStop(1, '#808080');
      ctx.beginPath(); ctx.arc(x, y, r * 1.3, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    }
  });
  const alpha = tex(`pegboard-a-${size}`, size, (ctx, s) => {     // 孔=透明，板=不透明
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, s, s);
    for (let y = step / 2; y < s; y += step) for (let x = step / 2; x < s; x += step) {
      ctx.beginPath(); ctx.arc(x, y, r * 1.1, 0, Math.PI * 2); ctx.fillStyle = '#000000'; ctx.fill();
    }
  });
  const result: TexSet = { color, bump, alpha };
  PEG_CACHE.set(size, result);
  return result;
}

/** 围网：镀锌钢丝网格，细密规则方格，金属光泽。钢丝≈2mm，网孔≈25mm。 */
function wireMeshTextures(size = 512) {
  const color = tex(`wire-c-${size}`, size, (ctx, s) => {
    ctx.fillStyle = '#1a1c20'; ctx.fillRect(0, 0, s, s);            // 网孔=黑暗
    const step = s / 16, lw = step * 0.12;                        // 钢丝≈2mm
    for (let i = 0; i <= s; i += step) {
      const g = ctx.createLinearGradient(0, i - lw, 0, i + lw);   // 圆柱体光泽
      g.addColorStop(0, '#5a6068'); g.addColorStop(0.5, '#c8d0d8'); g.addColorStop(1, '#5a6068');
      ctx.strokeStyle = g; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke(); // 经线
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke(); // 纬线
    }
  });
  const bump = tex(`wire-b-${size}`, size, (ctx, s) => {
    ctx.fillStyle = '#202020'; ctx.fillRect(0, 0, s, s);            // 网孔=深凹
    const step = s / 16, lw = step * 0.12;
    for (let i = 0; i <= s; i += step) {
      ctx.strokeStyle = '#d0d0d0'; ctx.lineWidth = lw;            // 钢丝=凸起
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke();
    }
  });
  return { color, bump };
}

// wood 用纯色（无纹理）——假木纹比无纹理难看，质感靠材质参数体现

/** 纹理集统一接口 */
interface TexSet { color: THREE.CanvasTexture; bump: THREE.CanvasTexture; alpha?: THREE.CanvasTexture }
/** 板材几何体：BoxGeometry 的 UV 按物理尺寸编码（而非每面 0-1），
 *  使纹理在所有朝向上都保持真实比例。6 个面 × 4 顶点 = 24 顶点，36 索引。 */
function panelGeo(w: number, h: number, d: number): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  const pos: number[] = [], uv: number[] = [], idx: number[] = [];
  const face = (a: [number, number, number], b: [number, number, number], c: [number, number, number], dd: [number, number, number],
    uAxis: 'x' | 'y' | 'z', vAxis: 'x' | 'y' | 'z', uFlip: boolean, vFlip: boolean) => {
    const verts = [a, b, c, dd];
    const start = pos.length / 3;
    for (const v of verts) {
      pos.push(v[0], v[1], v[2]);
      const u = uAxis === 'x' ? v[0] : uAxis === 'y' ? v[1] : v[2];
      const vv = vAxis === 'x' ? v[0] : vAxis === 'y' ? v[1] : v[2];
      uv.push(uFlip ? 1 - u / TEX_MM : u / TEX_MM, vFlip ? 1 - vv / TEX_MM : vv / TEX_MM);
    }
    idx.push(start, start + 1, start + 2, start, start + 2, start + 3);
  };
  const hx = w / 2, hy = h / 2, hz = d / 2;
  // +X 面 (右): Y×Z 平面
  face([hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz], [hx, -hy, hz], 'z', 'y', false, false);
  // -X 面 (左)
  face([-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz], [-hx, -hy, -hz], 'z', 'y', false, false);
  // +Y 面 (上): X×Z 平面
  face([-hx, hy, -hz], [-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz], 'x', 'z', false, false);
  // -Y 面 (下)
  face([-hx, -hy, hz], [-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz], 'x', 'z', false, false);
  // +Z 面 (前): X×Y 平面
  face([-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz], 'x', 'y', false, false);
  // -Z 面 (后)
  face([hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz], 'x', 'y', false, false);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/** 纹理覆盖的真实世界尺寸（mm），UV 按此缩放 → 所有面纹理密度一致 */
const TEX_MM = 400;

/** 板材材质基础（纹理在渲染循环按真实尺寸设置 repeat） */
const PANEL_BASE: Record<string, () => THREE.MeshStandardMaterial> = {
  wood: () => new THREE.MeshStandardMaterial({ color: 0xb08d57, roughness: 0.8, metalness: 0.05 }),
  pegboard: () => new THREE.MeshStandardMaterial({ color: 0xc9a06a, roughness: 0.75, metalness: 0.05 }),
  glass: () => new THREE.MeshStandardMaterial({ color: 0xa8cfe0, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.35 }),
  acrylic: () => new THREE.MeshStandardMaterial({ color: 0xf2f6f8, roughness: 0.15, metalness: 0.05, transparent: true, opacity: 0.45 }),
  'wire-mesh': () => new THREE.MeshStandardMaterial({ color: 0x9aa3ad, roughness: 0.6, metalness: 0.5, transparent: true, opacity: 0.35 }),
};
/** 纹理集查找表（wood 用纯色无纹理，仅 pegboard/wire-mesh 需要纹理） */
const PANEL_TEX: Record<string, () => TexSet> = {
  pegboard: pegboardTextures, 'wire-mesh': wireMeshTextures,
};

export function Viewer({ items, joints, machining, panels, accessories, mountPoints, dims, drawing, bubbles, viewRequest, focusY, onSelect, selection, warnMemberIds, profileColor }: ViewerProps) {
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
    bubbleGroup: THREE.Group;
    decor: THREE.Object3D[];
    requestView: (dir: THREE.Vector3) => void;
  } | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const prevDrawing = useRef(false);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8edf4);   // 嘉立创浅蓝灰画布

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 5, 40000);
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
    const bubbleGroup = new THREE.Group();
    scene.add(bubbleGroup);

    // ---- 视角立方体（嘉立创同款）：右上角姿态同步，点面切正交视角 ----
    const cubeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    cubeRenderer.setSize(104, 104);
    Object.assign(cubeRenderer.domElement.style, { position: 'absolute', top: '14px', right: '14px', cursor: 'pointer' });
    mount.appendChild(cubeRenderer.domElement);
    const cubeScene = new THREE.Scene();
    const cubeCam = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    cubeCam.position.set(0, 0, 4);
    const faceMat = (text: string) => {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d')!;
      g.fillStyle = '#f4f7fb'; g.fillRect(0, 0, 128, 128);
      g.strokeStyle = '#b8c2d2'; g.lineWidth = 6; g.strokeRect(3, 3, 122, 122);
      g.fillStyle = '#44536b'; g.font = 'bold 44px system-ui';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(text, 64, 68);
      return new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) });
    };
    // BoxGeometry 面序：+x -x +y -y +z -z
    const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 1.7),
      [faceMat('右'), faceMat('左'), faceMat('上'), faceMat('下'), faceMat('前'), faceMat('后')]);
    cubeScene.add(cubeMesh);

    // 视角切换补间
    let viewTween: { from: THREE.Vector3; to: THREE.Vector3; t: number } | null = null;
    const requestView = (d: THREE.Vector3) => {
      const dir = d.clone();
      if (Math.abs(dir.y) > 0.99) dir.z = 0.02;
      dir.normalize();
      const dist = camera.position.distanceTo(controls.target);
      viewTween = {
        from: camera.position.clone(),
        to: controls.target.clone().addScaledVector(dir, dist),
        t: 0,
      };
    };
    cubeRenderer.domElement.addEventListener('click', (e) => {
      const rect = cubeRenderer.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const rc = new THREE.Raycaster();
      rc.setFromCamera(ndc, cubeCam);
      const hit = rc.intersectObject(cubeMesh, false)[0];
      if (!hit?.face) return;
      // cube 姿态=相机逆 → 局部法线即主场景世界方向
      requestView(hit.face.normal.clone());
    });

    renderer.setAnimationLoop(() => {
      if (viewTween) {
        viewTween.t = Math.min(1, viewTween.t + 0.07);
        const k = viewTween.t * viewTween.t * (3 - 2 * viewTween.t);   // smoothstep
        camera.position.lerpVectors(viewTween.from, viewTween.to, k);
        controls.update();
        if (viewTween.t >= 1) viewTween = null;
      }
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      cubeMesh.quaternion.copy(camera.quaternion).invert();
      cubeRenderer.render(cubeScene, cubeCam);
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
      dimGroup, bubbleGroup,
      decor: [gridMinor, gridMajor, xAxis, zAxis],
      requestView,
    };

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      cubeRenderer.dispose();
      pmrem.dispose();
      mount.removeChild(renderer.domElement);
      mount.removeChild(labelRenderer.domElement);
      mount.removeChild(cubeRenderer.domElement);
      ctxRef.current = null;
    };
  }, []);

  // 重建构件与连接件
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    for (const child of [...ctx.group.children]) {
      ctx.group.remove(child);
      if (child instanceof CSS2DObject) { child.element.remove(); continue; }
      const m = child as THREE.Mesh | THREE.LineSegments;
      m.geometry?.dispose();
    }
    ctx.memberMeshes.clear();
    ctx.jointMeshes.clear();

    // 同截面同长度共享一份挤出几何（渲染实验验证的性能路线）
    const geomCache = new Map<string, { geom: THREE.ExtrudeGeometry; edges: THREE.EdgesGeometry }>();
    // 图纸风：白体深棱线（近似线框）；默认：型材颜色（银白/黑/金）
    const profileHex = PROFILE_COLORS[profileColor ?? 'silver'] ?? PROFILE_COLORS.silver;
    const baseColor = drawing ? 0xf8fafc : profileHex;
    const edgeMat = new THREE.LineBasicMaterial(drawing
      ? { color: 0x2f3a4d, transparent: true, opacity: 0.9 }
      : { color: 0x6b7280, transparent: true, opacity: 0.35 });

    for (const item of items) {
      const key = `${item.section.id}:${item.length}`;
      let cached = geomCache.get(key);
      if (!cached) {
        const geom = profileGeometry(buildSectionShape(item.section), item.length);
        cached = { geom, edges: new THREE.EdgesGeometry(geom, 25) };
        geomCache.set(key, cached);
      }
      const alu = drawing
        ? new THREE.MeshStandardMaterial({ color: baseColor, metalness: 0, roughness: 1 })
        : new THREE.MeshStandardMaterial({ color: baseColor, metalness: 0.9, roughness: 0.38, envMapIntensity: 0.9 });
      const mesh = new THREE.Mesh(cached.geom, alu);
      if (item.axis === 'x') mesh.rotation.y = Math.PI / 2;
      else if (item.axis === 'y') mesh.rotation.x = -Math.PI / 2;
      if (item.tilt) {   // 斜撑：背面平面内绕Z倾旜
        mesh.rotation.set(0, Math.PI / 2, item.tilt, 'ZYX');
      }
      mesh.position.set(...item.position);
      // 梁端与柱面共面会 z-fighting，渲染层缩 0.3mm（不影响下料数据）
      if (item.role !== 'post') mesh.scale.z = (item.length - 0.3) / item.length;
      mesh.userData.sel = { type: 'member', id: item.id } satisfies Selection;
      mesh.userData.member = item;
      mesh.userData.baseColor = baseColor;
      mesh.userData.baseColor = baseColor;
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

    // 板材：自定义几何体按物理尺寸映射 UV（纹理真实比例不拉伸），洞洞板孔透明
    for (const p of panels) {
      const mat = (PANEL_BASE[p.material] ?? PANEL_BASE.wood)();
      const texFn = PANEL_TEX[p.material];
      const [sx, sy, sz] = p.boxSize;
      if (texFn) { const t = texFn(); mat.map = t.color; mat.bumpMap = t.bump; if (t.alpha) { mat.alphaMap = t.alpha; mat.transparent = true; } }
      const mesh = new THREE.Mesh(panelGeo(Math.abs(sx), Math.abs(sy), Math.abs(sz)), mat);
      mesh.position.set(...p.position);
      ctx.group.add(mesh);
      if (p.mode === 'door-front') {   // 门把手：右缘内 40mm 竖拉手
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 110, 10),
          new THREE.MeshStandardMaterial({ color: 0x4a4f57, metalness: 0.8, roughness: 0.3 }));
        handle.position.set(p.position[0] + sx / 2 - 40, p.position[1], p.position[2] + sz / 2 + 18);
        ctx.group.add(handle);
      }
    }

    // 脚轮：简化轮体+叉架；LED 灯条：自发光长条
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2a2d31, roughness: 0.7 });
    const forkMat = new THREE.MeshStandardMaterial({ color: 0x8a8f96, metalness: 0.8, roughness: 0.4 });
    for (const a of accessories) {
      if (a.kind === 'led-strip') {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(a.lengthMm ?? 500, 6, 10),
          new THREE.MeshStandardMaterial({ color: 0xfff6d8, emissive: 0xffe08a, emissiveIntensity: 1.4 }));
        bar.position.set(...a.position);
        ctx.group.add(bar);
        continue;
      }
      if (a.kind === 'drawer-box') {   // 抽屉盒：箱体+前面板
        const [bw, bh, bd] = a.boxSize ?? [200, 140, 300];
        const body = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd),
          new THREE.MeshStandardMaterial({ color: 0xcfc4ae, roughness: 0.8 }));
        body.position.set(...a.position);
        ctx.group.add(body);
        const face = new THREE.Mesh(new THREE.BoxGeometry(bw + 16, bh + 10, 12),
          new THREE.MeshStandardMaterial({ color: 0x9a7b56, roughness: 0.6 }));
        face.position.set(a.position[0], a.position[1], a.position[2] + bd / 2 + 7);
        ctx.group.add(face);
        continue;
      }
      if (a.kind === 'leveling-foot') {   // 调平地脚：圆盘垫+丝杆
        const pad = new THREE.Mesh(new THREE.CylinderGeometry(20, 24, 12, 16), wheelMat);
        pad.position.set(a.position[0], a.position[1] - 12, a.position[2]);
        ctx.group.add(pad);
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 30, 12), forkMat);
        stem.position.set(a.position[0], a.position[1] + 10, a.position[2]);
        ctx.group.add(stem);
        continue;
      }
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 20, 20), wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(a.position[0], a.position[1], a.position[2]);
      ctx.group.add(wheel);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 35, 12), forkMat);
      stem.position.set(a.position[0], a.position[1] + 28, a.position[2]);
      ctx.group.add(stem);
    }

    // 固定点：结构视图小蓝球 + 编号标签（title 原生悬停显示固定方式/紧固件）
    if (mountPoints.length) {
      const dotMat = new THREE.MeshStandardMaterial({ color: 0x1e6fff, transparent: true, opacity: 0.85, depthTest: false });
      for (const mp of mountPoints) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(6, 12, 12), dotMat);
        dot.position.set(...mp.position);
        dot.renderOrder = 997;
        ctx.group.add(dot);
        if (mp.label) {
          const el = document.createElement('div');
          el.textContent = mp.label;
          el.title = mp.note ?? '';
          el.style.cssText = 'font:600 10px system-ui;color:#fff;background:#1e6fff;border-radius:8px;padding:1px 5px;cursor:help;pointer-events:auto;transform:translateY(-12px)';
          const o = new CSS2DObject(el);
          o.position.set(...mp.position);
          ctx.group.add(o);
        }
      }
    }

    // 地面贴底：脚轮/地脚垫高时，网格/轴线下移到着地平面
    const grounded = accessories.filter((a) => a.kind === 'caster' || a.kind === 'leveling-foot');
    const groundY = grounded.length
      ? Math.min(...grounded.map((a) => a.position[1] - (a.kind === 'caster' ? 25 : 18))) : 0;
    ctx.decor.forEach((o) => { o.position.y = groundY; });

    ctx.controls.target.set(0, focusY, 0);
    ctx.controls.update();
  }, [items, joints, machining, panels, accessories, mountPoints, focusY, drawing]);

  // 图纸模式切换：白底/隐装饰/窄fov伪正交（距离补偿保持视觉尺寸）
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const isD = !!drawing;
    ctx.scene.background = new THREE.Color(isD ? 0xffffff : 0xe8edf4);
    ctx.decor.forEach((o) => { o.visible = !isD; });
    if (prevDrawing.current !== isD) {
      const cam = ctx.camera;
      const oldFov = cam.fov;
      const newFov = isD ? 15 : 50;
      const k = Math.tan(THREE.MathUtils.degToRad(oldFov / 2)) / Math.tan(THREE.MathUtils.degToRad(newFov / 2));
      cam.fov = newFov;
      cam.updateProjectionMatrix();
      const dist = cam.position.distanceTo(ctx.controls.target);
      const dir = cam.position.clone().sub(ctx.controls.target).normalize();
      // 图纸模式多留 25% 边距给尺寸标注
      cam.position.copy(ctx.controls.target).addScaledVector(dir, dist * k * (isD ? 1.25 : 0.8));
      // 窄 fov 下相机被拉得很远：同步拉开缩放区间，避免近/远裁剪面切进模型（页面"失真"缺角）
      ctx.controls.minDistance = isD ? 800 : 120;
      ctx.controls.maxDistance = isD ? 30000 : 4500;
      ctx.controls.update();
      prevDrawing.current = isD;
    }
  }, [drawing]);

  // 件号球标（图纸模式）
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    for (const c of [...ctx.bubbleGroup.children]) {
      ctx.bubbleGroup.remove(c);
      if (c instanceof CSS2DObject) c.element.remove();
    }
    for (const b of bubbles ?? []) {
      const el = document.createElement('div');
      Object.assign(el.style, {
        width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #2f3a4d',
        background: '#fff', color: '#2f3a4d', font: 'bold 11px system-ui',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      });
      el.textContent = b.label;
      const o = new CSS2DObject(el);
      o.position.set(...b.position);
      ctx.bubbleGroup.add(o);
    }
  }, [bubbles]);

  // 外部视图切换请求（主视/俯视/侧视按钮）
  useEffect(() => {
    if (!viewRequest) return;
    ctxRef.current?.requestView(new THREE.Vector3(...viewRequest.dir));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewRequest?.seq]);

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
        mat.color.setHex((mesh.userData.baseColor as number) ?? 0xc4c9cf);
        mat.metalness = drawing ? 0 : 0.9;
        mat.roughness = drawing ? 1 : 0.38;
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
  }, [selection, items, warnMemberIds, drawing]);

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
