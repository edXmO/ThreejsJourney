import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

//ObjectGroup

const group = new THREE.Group()
scene.add(group);

const cubeOne = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
);
const cubeTwo = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
);
const cubeThree = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
);

group.add(cubeOne);
group.add(cubeTwo);
group.add(cubeThree);

cubeTwo.position.y = 1;
cubeThree.position.x = 1;

// group.scale.y = 2;
// group.rotation.z = Math.PI * 2;

// Object Positioning
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 0.4);
// scene.add(mesh)

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 1;
// mesh.scale.z = 1;

mesh.scale.set(2, 1, 1);

//Rotation 
// Order in which the object rotates around the axis
mesh.rotation.reorder('YXZ');
mesh.rotation.y = Math.PI / 2;
mesh.rotation.x = Math.PI * 0.25;

// AxesHelper
const axesHelper = new THREE.AxesHelper(5);

scene.add(axesHelper);


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

camera.lookAt(group.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time && Clock, two ways of synchronize the animation with
// the framerate so to be sure the animation always goes to the same speed

// Time
// let time = Date.now();

// Clock

let clock = new THREE.Clock();

//Animations

// gsap.to(group.position, {x : 2, duration: 1, delay: 2});

const tick = () => 
{

    //Clock 
    // const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime)

    // Time
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;

    // Update object
    // group.rotation.y += 0.01 * deltaTime;
    // Elevator Mode 
    // group.position.y = Math.tan(elapsedTime)
    // Circles
    // group.position.x = Math.sin(elapsedTime);
    // group.position.y = Math.cos(elapsedTime);

    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);

    // console.log('tick')
    // Render
    renderer.render(scene, camera)

    // Not calling the functions, passing the function as a parameter
    window.requestAnimationFrame(tick);
}

tick();