var scene = new THREE.Scene();

var camera;
var scene;
var renderer;
var controls;

var spotLight;
var counter = 0;

init();
animate();
  
function init() {
  
    // Create a scene
    scene = new THREE.Scene();
  
    // Add the camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 100, 250);
  
    // Add scene elements
    addSceneElements();
  
    // Add lights
    addLights();
  
    // Create the WebGL Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
  
    // Append the renderer to the body
    document.body.appendChild( renderer.domElement );
  
    // Add a resize event listener
    window.addEventListener( 'resize', onWindowResize, false );
  
    // Add the orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 100, 0);
}
  
function addLights() {
 //   var dirLight = new THREE.DirectionalLight(0xffffff, 1);
 //   dirLight.position.set(100, 100, 50);
  //  scene.add(dirLight);
//var ambLight = new THREE.AmbientLight(0x404040);
//scene.add(ambLight);
  
var bluePoint = new THREE.PointLight(0x0033ff, 3, 150);
bluePoint.position.set( 70, 5, 70 );
scene.add(bluePoint);
scene.add(new THREE.PointLightHelper(bluePoint, 3));
  
