const canvas = document.querySelector('.webgl');

// 4 Elements to create a scene
// A Scene that will contain the objects
// Create Objects
// Create a camera
// Create a renderer

const scene = new THREE.Scene();

// Objects can be of many types
// Primitive geometries
// Models
// Particles
// Lights

// Create a mesh, a combination of a Material and a Geometry

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000})

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// We can't see anything yet because we need to have a camera to be able to see the objects in the scene

// PerspectiveCamera meaning if an object is far it'll be small, if it is close it'll be big

// First parameter is vertical fieldOfView (in degreees 75)
// Second parameter => aspectRatio
const sizes = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Positioning the camera
camera.position.z = 3;

scene.add(camera);

// Lasty the renderer, render the scene but from the camera point of view

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
