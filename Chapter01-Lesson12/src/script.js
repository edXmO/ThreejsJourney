import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import dat from 'dat.gui';

const gui = new dat.GUI();

// Parameters

// const materialParams = {
//     metalness: 0.15
// }

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures 

const textureLoader = new THREE.TextureLoader();
const doorTexture = textureLoader.load('/textures/door/color.jpg');
const matcaps = textureLoader.load('/textures/matcaps/4.png');
const enviroment = textureLoader.load('/textures/environmentMaps/1/nz.jpg');
const gradient = textureLoader.load('/textures/gradients/5.jpg');
const doorMetalTexture = textureLoader.load('/textures/door/metalness.jpg');
const ambientOclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')

gradient.minFilter = THREE.NearestFilter
gradient.magFilter = THREE.NearestFilter
gradient.generateMipmaps = false
// Object
// const blueMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true });
// const greenMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true });
// const redMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true });

// Normal Material

// const greenMaterial = new THREE.MeshNormalMaterial({color: 0x00ff00, wireframe: true})

// const greenMaterial = new THREE.MeshMatcapMaterial({matcap: matcaps})

// const greenMaterial = new THREE.MeshDepthMaterial({color: 0x00ff00})

// Material that reacts to light

// const greenMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});

// const greenMaterial = new THREE.MeshPhongMaterial({specular: new THREE.Color('red'), shininess: 100})

// const greenMaterial = new THREE.MeshToonMaterial({gradientMap: gradient});

const material = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.1,
    map: doorTexture,
    aoMap: ambientOclusionTexture,
    aoMapIntensity: 10,
    normalMap: doorNormalTexture
});


// GUI

gui
.add(material, 'metalness')
.min(0)
.max(1)
.step(0.01)
.name('metalness')

gui.add(material, 'roughness')
.min(0)
.max(1)
.step(0.01)
.name('roughness')

gui
.add(material, 'aoMapIntensity')
.min(0)
.max(10)
.step(0.01)
.name('ambient intensity')


const planeGeometry = new THREE.PlaneGeometry(1, 1)
const sphereGeometry = new THREE.SphereGeometry(0.5 , 32, 32);
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);



const sphere = new THREE.Mesh(sphereGeometry, material);
const torus = new THREE.Mesh(torusGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
sphere.position.x = -1.5
torus.position.x = 1.5

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv, 2));
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv, 2))

scene.add(plane, sphere, torus)


// Lights

const ambientLights = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLights)

const pointLights = new THREE.PointLight(0xffffff, 0.5)
pointLights.position.x = 3
pointLights.position.y = 4
pointLights.position.z = 5
scene.add(pointLights)

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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // plane.rotation.y = 0.1 * elapsedTime;
    // sphere.rotation.y = 0.1 * elapsedTime;
    // torus.rotation.y = 0.1 * elapsedTime;
    
    // torus.rotation.x = 0.15 * elapsedTime;
    // sphere.rotation.x = 0.15 * elapsedTime;
    // plane.rotation.x = 0.15 * elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()