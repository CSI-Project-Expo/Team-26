import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('app');

/* ===== Scene ===== */
const scene = new THREE.Scene();

/* ===== Camera ===== */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

/* ===== Renderer ===== */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

/* ===== Lighting (ENHANCED) ===== */
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(5, 10, 7);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Add a front light to illuminate the model from camera direction
const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
frontLight.position.set(0, 0, 5);
scene.add(frontLight);

/* ===== Temporary Placeholder (so you see SOMETHING) ===== */
const placeholderGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const placeholderMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xff69b4,
  metalness: 0.3,
  roughness: 0.7
});
const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
placeholder.position.set(-5, -3.5, 0); // ⬅️ Far left corner
scene.add(placeholder);

/* ===== Load Bunny Robot (POSITIONED IN BOTTOM-LEFT CORNER) ===== */
const loader = new GLTFLoader();

loader.load(
  '/models/bunny_robot_r_34.glb',
  (gltf) => {
    const robot = gltf.scene;

    // Remove placeholder once model loads
    scene.remove(placeholder);

    console.log('✅ Robot loaded successfully!');
    console.log('Robot structure:', robot);

    // 🧭 Center the model
    const box = new THREE.Box3().setFromObject(robot);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    console.log('Model size:', size);
    console.log('Model center:', center);

    // Move to origin
    robot.position.sub(center);

    // 📏 Auto-scale - BIGGER SIZE
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scale = 4.5 / maxAxis;
    robot.scale.setScalar(scale);

    // 🎥 Position in BOTTOM-LEFT CORNER of screen
    robot.position.set(-5, -3.5, 0); // ⬅️ Much further left (-5) and lower (-3.5)
    
    // ⬅️ FACE FORWARD (toward camera)
    robot.rotation.y =Math.PI/6;
    
    // Make sure all materials are visible
    robot.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(robot);
    
    // Store reference for animation
    window.bunnyRobot = robot;
  },
  (xhr) => {
    const percent = (xhr.loaded / xhr.total * 100).toFixed(1);
    console.log(`📦 Loading model: ${percent}%`);
  },
  (error) => {
    console.error('❌ Model load error:', error);
    console.log('💡 Keeping placeholder sphere visible');
  }
);

/* ===== Webcam as Scene Background ===== */
const video = document.createElement('video');
video.muted = true;
video.playsInline = true;
video.autoplay = false;

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.needsUpdate = true;

      scene.background = videoTexture;
      console.log('📷 Webcam active');
    };
  })
  .catch(err => {
    console.error('Webcam error:', err);
  });

/* ===== Resize Handling ===== */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ===== Animate ===== */
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();