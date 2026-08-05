import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Section } from '../knowledge/types';
import type { Axis } from '../engine/types';
import { buildSectionShape, profileGeometry } from './profileGeometry';

export interface RenderMember {
  section: Section;
  length: number;
  position: [number, number, number];
  axis: Axis;
}

interface ViewerProps {
  items: RenderMember[];
  /** 相机注视高度（一般取框架半高） */
  focusY: number;
}

export function Viewer({ items, focusY }: ViewerProps) {
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
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x99aabb, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(300, 500, 200);
    scene.add(dir);
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

    const alu = new THREE.MeshStandardMaterial({ color: 0xc8ccd2, metalness: 0.35, roughness: 0.45 });
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
      ctx.group.add(mesh);
    }

    ctx.controls.target.set(0, focusY, 0);
    ctx.controls.update();
  }, [items, focusY]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
