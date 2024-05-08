import * as THREE from 'three';

export function addAmbientLight() {
	return new THREE.AmbientLight(0x404040, 2); // Higher intensity for ambient lighting
}

export function addLight() {
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Brighter directional light
	directionalLight.position.set(5, 3, 5); // Adjust to position light better
	return directionalLight;
}
