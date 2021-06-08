import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLight } from 'three'

const directionalColor = {
    color: 0x000ffcc
}

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Debug

gui
.add(ambientLight, 'intensity')
.min(0)
.max(1)
.step(0.01)
.name('Ambient Intensity')

const directionalLight = new THREE.DirectionalLight(0x000ffc, 0.5)
scene.add(directionalLight)

// Debug
const directionalLightFolder = gui.addFolder('Directional Lights');
directionalLightFolder
.add(directionalLight, 'intensity')
.min(0)
.max(1)
.step(0.01)
.name('Intensity')

directionalLightFolder.open();

const pointLight = new THREE.PointLight(0xffffff, 0.5 )
pointLight.position.x = 3;
pointLight.position.y = 4;
pointLight.position.z = 5;
scene.add(pointLight)


const pointLightFolder = gui.addFolder('Point lights')

// Debug 
pointLightFolder.open();

pointLightFolder
.add(pointLight.position, 'x')
.min(-10)
.max(10)
.step(0.1)
.name('x')

pointLightFolder
.add(pointLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('y')

pointLightFolder
.add(pointLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('z')

const hemisphereLights = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
// scene.add(hemisphereLights);

const hemisphereLightsFolder = gui.addFolder('Hemisphere Lights')
hemisphereLightsFolder
.add(hemisphereLights, 'intensity')
.min(0)
.max(1)
.step(0.01)
.name('Intensity')

hemisphereLightsFolder.open()


const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 0.2, 1, 1)
scene.add(rectAreaLight)

const rectAreaLightFolder = gui.addFolder('RectArea Light')

rectAreaLightFolder.open();

rectAreaLightFolder
.add(rectAreaLight, 'intensity')
.min(0)
.max(10)
.step(0.01)
.name('Intensity')

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()