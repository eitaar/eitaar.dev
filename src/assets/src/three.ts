import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { convert } from 'three/src/nodes/TSL.js';

class Util {
  static convertToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
export default function show3DModel(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  const loader = new GLTFLoader();
  const controls = new OrbitControls(camera, renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const pointLight1 = new THREE.PointLight(0xffffff, 200);
  const pointLight2 = new THREE.PointLight(0xffffff, 200);
  pointLight1.position.set(0, 10, 0);
  pointLight2.position.set(0, -10, 0);
  scene.add(ambientLight);
  scene.add(pointLight1);
  scene.add(pointLight2);
  camera.position.set(0, 1, 5);

  loader.load('/models/mht.gltf', (gltf) => {
    try {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 0, 0); // Set position
      gltf.scene.scale.set(4, 4, 4); // Set scale
    } catch (error) {
      console.error('Error adding model to scene:', error);
    }
  });
  const gridHelper = new THREE.GridHelper(10, 20);
  scene.add(gridHelper);

  renderer.setSize(window.innerWidth, window.innerHeight);
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
