import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WebGPURenderer } from 'three/webgpu';
import Stats from 'three/examples/jsm/libs/stats.module.js';

function showStats() {
  const stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  return stats;
}
// Main function to initialize and display 3D model
export default async function show3DModel(
  canvas: HTMLCanvasElement,
  filename: string,
  isDeveloperMode: boolean
): Promise<void> {
  // Create the basic Three.js components
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x17191d);
  // Create and configure the camera
  const fieldOfView = 75;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const nearPlane = 0.1;
  const farPlane = 1000;
  const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  camera.position.set(0, 5, 5);

  const renderer = new WebGPURenderer({ canvas });
  await renderer.init();

  const controls = new OrbitControls(camera, renderer.domElement);

  // Set up lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const topLight = new THREE.PointLight(0xffffff, 200);
  topLight.position.set(0, 10, 0);
  const bottomLight = new THREE.PointLight(0xffffff, 200);
  bottomLight.position.set(0, -10, 0);
  scene.add(ambientLight);
  scene.add(topLight);
  scene.add(bottomLight);

  // Add grid helper to scene for reference
  const gridSize = 10;
  const gridDivisions = 20;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
  scene.add(gridHelper);

  // Configure renderer
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Handle window resize events
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  if (isDeveloperMode) {
    const light = new THREE.DirectionalLight(0xffffff);
    const helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper);
  }
  // Load and add 3D model to scene
  const loader = new GLTFLoader();
  const modelPath = `/models/${filename}`;

  loader.load(modelPath, (gltf) => {
    try {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.set(4, 4, 4);
    } catch (error) {
      console.error('Error adding model to scene:', error);
    }
  });

  const stats = isDeveloperMode ? showStats() : false;
  // Main animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    if (stats) {
      stats.update();
    }
  }

  // Start the animation
  animate();
  renderer.render(scene, camera);
  window.addEventListener('resize', handleResize);
}
