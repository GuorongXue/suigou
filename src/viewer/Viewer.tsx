import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { Section } from '../knowledge/types';
import type { Axis } from '../engine/types';
import { buildSectionShape, profileGeometry } from './profileGeometry';

export interface RenderMember {
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
}

export function Viewer({ items, joints, focusY }: ViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    group: THREE.Group;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f4f7);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 1, 8000);
    camera.position.set(900, 700, 1100);

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

    const dir = new THREE.DirectionalLight(0xffffff, 2.2);
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
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(4000, 4000),
      new THREE.ShadowMaterial({ opacity: 0.18 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    scene.add(new THREE.GridHelper(2000, 40, 0xbbbbbb, 0xdddddd));

    const group = new THREE.Group();
    scene.add(group);

    renderer.setAnimationLoop(() => renderer.render(scene, camera));

    const ro = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    ro.observe(mount);

    ctxRef.current = { scene, camera, renderer, controls, group };

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      ctxRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    for (const child of [...ctx.group.children]) {
      ctx.group.remove(child);
      (child as THREE.Mesh).geometry?.dispose();
    }

    const alu = new THREE.MeshStandardMaterial({
      color: 0xc4c9cf, metalness: 0.9, roughness: 0.38, envMapIntensity: 0.9,
    });
    // 同截面同长度共享一份挤出几何（渲染实验验证的性能路线）
    const geomCache = new Map<string, THREE.ExtrudeGeometry>();

    for (const item of items) {
      const key = `${item.section.id}:${item.length}`;
      let geom = geomCache.get(key);
      if (!geom) {
        geom = profileGeometry(buildSectionShape(item.section), item.length);
        geomCache.set(key, geom);
      }
      const mesh = new THREE.Mesh(geom, alu);
      if (item.axis === 'x') mesh.rotation.y = Math.PI / 2;
      else if (item.axis === 'y') mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(...item.position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      ctx.group.add(mesh);
    }

    // 连接件渲染
    const steel = new THREE.MeshStandardMaterial({ color: 0x8a8f96, metalness: 0.9, roughness: 0.4 });
    const xray = new THREE.MeshStandardMaterial({
      color: 0x2ec4d6, metalness: 0.3, roughness: 0.3,
      transparent: true, opacity: 0.65, depthTest: false,   // X-ray：隐藏式连接件透视可见
    });

    for (const j of joints) {
      const s = j.size;
      const t = Math.max(3, s * 0.12);   // 板厚
      const [jx, jy, jz] = j.position;

      if (j.hidden) {
        // 隐藏式（锤式/内置/端攻）：沿梁轴的螺栓状园柱，跨过接合面
        const len = s * 1.4;
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(s * 0.14, s * 0.14, len, 16), xray);
        if (j.beamAxis === 'x') cyl.rotation.z = Math.PI / 2;
        else cyl.rotation.x = Math.PI / 2;
        cyl.position.set(jx, jy, jz);
        cyl.renderOrder = 999;
        ctx.group.add(cyl);
        continue;
      }

      // 角码：L型两块板（立板贴立柱面 + 平板贴梁面）
      const beamFaceY = jy + j.ySide * (s / 2);          // 梁的上/下表面
      const vPlate = new THREE.Mesh(new THREE.BoxGeometry(
        j.beamAxis === 'x' ? t : s * 0.8,
        s * 0.8,
        j.beamAxis === 'x' ? s * 0.8 : t,
      ), steel);
      const vOff = j.outward * (t / 2);
      vPlate.position.set(
        j.beamAxis === 'x' ? jx - vOff : jx,
        beamFaceY + j.ySide * (s * 0.4),
        j.beamAxis === 'x' ? jz : jz - vOff,
      );
      vPlate.castShadow = true;
      ctx.group.add(vPlate);

      const hPlate = new THREE.Mesh(new THREE.BoxGeometry(
        j.beamAxis === 'x' ? s * 0.8 : s * 0.8,
        t,
        s * 0.8,
      ), steel);
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

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
