import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

// Debug
const ambientLightFolder = gui.addFolder('AmbientLights')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
scene.add(directionalLight)

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2.1;
directionalLight.shadow.camera.bottom = -2.1;
directionalLight.shadow.camera.left = -3;
directionalLight.shadow.camera.right = 3;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;

directionalLight.castShadow = true;
// Blur general, no dependiente de distancias
// radius shadow no funciona con PCFShadowMap
// directionalLight.shadow.radius = 10;


const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightCameraHelper);

// Debug 
const directionalLightFolder = gui.addFolder('DirectionalLight');

directionalLightFolder
.add(directionalLightCameraHelper, 'visible')
.name('Helper Visible');

directionalLightFolder
.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
directionalLightFolder
.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
directionalLightFolder
.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
directionalLightFolder
.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)

// SpotLight

const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.width = 1024;
spotLight.position.set(0, 2, 2);
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

scene.add(spotLight);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper);



// PointLight

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(-1, 1, 0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);

scene.add(pointLightCameraHelper);

const pointLightCameraFolder = gui.addFolder('PointLight');

pointLightCameraFolder
.add(pointLightCameraHelper, 'visible')
.name('Helper Visible')




// Debug
const spotLightFolder = gui.addFolder('SpotLight')

spotLightFolder
.add(spotLightCameraHelper, 'visible')
.name("Helper Visible")


/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7

// Debug
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)

sphere.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

plane.receiveShadow = true;

scene.add(sphere, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    sphere.position.x = Math.sin(elapsedTime);
    sphere.position.z = Math.cos(elapsedTime);
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()