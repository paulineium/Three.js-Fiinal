import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { addEarth, addClouds, addStars } from './addMeshes'
import { addLight, addAmbientLight } from './addLights'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0, 0, 5)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Lights
const ambientLight = addAmbientLight();
scene.add(ambientLight);
const directionalLight = addLight();
scene.add(directionalLight);

// Meshes
const earth = addEarth();
scene.add(earth);
const clouds = addClouds();
scene.add(clouds);

// Stars
const stars = addStars();
scene.add(stars);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

document.getElementById('countrySelect').addEventListener('change', function () {
	const country = this.options[this.selectedIndex].text;
	focusOnLocation(country);
});

function focusOnLocation(country) {
	const countryData = {
		"USA (New York)": {
			position: new THREE.Vector3(1.6657528343369252, 1.4682335796490487, -0.4817365587008268),
			rotation: new THREE.Euler(-1.8878351184569437, 0.822910498410717, 1.991604857616036, 'XYZ')
		},
		"Italy (Rome)": {
			position: new THREE.Vector3(-0.44497067662089823, 1.510183431974233, -1.6812797145144582),
			rotation: new THREE.Euler(-2.4097538267688843, -0.19440762374407322, -2.9697777905175107, 'XYZ')
		},
		"Japan (Tokyo)": {
			position: new THREE.Vector3(-1.4064834545956986, 1.4683575795668034, 1.449567866522714),
			rotation: new THREE.Euler(-0.7918374825940561, -0.5983094234576647, -0.5184815451091062, 'XYZ')
		},
		"United Kingdom (London)": {
			position: new THREE.Vector3(0.0889976232156144, 1.8472218036506187, -1.375986836864621),
			rotation: new THREE.Euler(-2.2110224136775396, 0.03861859613274169, 3.0898075517878323, 'XYZ')
		}
	};

	const { position, rotation } = countryData[country] || {};

	if (position && rotation) {
		camera.position.copy(position);
		camera.rotation.copy(rotation);
	} else {
		console.error('No predefined values for this country.');
	}

	camera.lookAt(earth.position);
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
	console.log('rotation', camera.rotation)
	console.log(camera.position)
}

animate();

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});
}

resize();

document.addEventListener('DOMContentLoaded', () => {
	// Show the welcome modal
	const welcomeModal = document.getElementById("welcomeModal");
	welcomeModal.style.display = 'block';

	// Event listener for the "Get Started" button
	const startButton = document.getElementById("startButton");
	startButton.addEventListener('click', () => {
		welcomeModal.style.display = 'none';
	});
});
