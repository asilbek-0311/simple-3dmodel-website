import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
// canvas.appendChild(renderer.domElement);

//mkaing the 3d object global so i can access later
let object, controls;
let objToRender = './model/scene.gltf';

console.log(objToRender);

const loader = new GLTFLoader();
loader.load(objToRender, 
    function(gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.error(error);
    });

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 15;
camera.position.y = 4;
// camera.position.x = 3;

const directLight = new THREE.DirectionalLight(0xffffff, 10);
directLight.position.set(20, 20, 20);
scene.add(directLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});