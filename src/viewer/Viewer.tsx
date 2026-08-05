import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Section } from '../knowledge/types';
import { buildSectionShape, profileGeometry } from './profileGeometry';

interface ViewerProps {
  section: Section;
  length: number;
}

export function Viewer({ section, length }: ViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    mesh: THREE.Mesh | null;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f4f7);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 1, 5000);
    camera.position.set(320, 280, 420);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 150, 0);
    controls.update();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x99aabb, 1.2));
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(300, 500, 200);
    scene.add(dir);
    scene.add(new THREE.GridHelper(800, 16, 0xbbbbbb, 0xdddddd));

    renderer.setAnimationLoop(() => renderer.render(scene, camera));

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    sceneRef.current = { scene, camera, renderer, controls, mesh: null };

    return () => {
      ro.disconnect();
      renderer.setAnimationLoop(null);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx) return;

    if (ctx.mesh) {
      ctx.scene.remove(ctx.mesh);
      ctx.mesh.geometry.dispose();
    }

    const alu = new THREE.MeshStandardMaterial({ color: 0xc8ccd2, metalness: 0.35, roughness: 0.45 });
    const shape = buildSectionShape(section);
    const mesh = new THREE.Mesh(profileGeometry(shape, length), alu);
    mesh.rotation.x = -Math.PI / 2;   // 挤出方向转为竖直
    mesh.position.set(0, length / 2, 0);
    ctx.scene.add(mesh);
    ctx.mesh = mesh;

    ctx.controls.target.set(0, length / 2, 0);
    ctx.controls.update();
  }, [section, length]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
