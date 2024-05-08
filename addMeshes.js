import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export function addEarth() {
	const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
	const earthMaterial = new THREE.MeshPhongMaterial({
		map: textureLoader.load('/Albedo.jpg'), // Earth's surface texture
		bumpMap: textureLoader.load('/Bump.jpg'),
		bumpScale: 0.05,
		specularMap: textureLoader.load('/Ocean.png'),
		specular: new THREE.Color('grey')
	});
	const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
	earthMesh.rotation.y = Math.PI / 2;
	return earthMesh;
}

export function addClouds() {
	const cloudGeometry = new THREE.SphereGeometry(2.02, 64, 64);
	const cloudMaterial = new THREE.MeshPhongMaterial({
		map: textureLoader.load('/Clouds.png'),
		transparent: true,
		opacity: 0.2,
		blendSrc: THREE.SrcAlphaFactor,
		blendDst: THREE.OneMinusSrcAlphaFactor
	});
	const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
	return cloudMesh;
}


export function addStars() {
	const starGeometry = new THREE.SphereGeometry(50, 64, 64);
	const starMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load('/bkg.png'),
		side: THREE.BackSide
	});
	const starMesh = new THREE.Mesh(starGeometry, starMaterial);
	return starMesh;
}
