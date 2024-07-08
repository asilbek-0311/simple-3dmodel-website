import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FBXLoader.js'

//create scene
const scene = new THREE.Scene();

//create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

//create a rendere adn set its size
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});
renderer.setSize(window.innerWidth, window.innerHeight);

//add a light to the scene
const directionLight = new THREE.DirectionalLight(0xffffff, 100);
directionLight.position.set(1, 1, 1);
scene.add(directionLight);

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight);


//load the fbx model
const loader = new FBXLoader();
loader.load('./Floating.fbx', 
    function (object) {
        scene.add(object);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

//animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();