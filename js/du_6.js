
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
  // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
  //  dirLight.position.set(-500, 100, 50);
 //  scene.add(dirLight);
//var ambLight = new THREE.AmbientLight(0x404040);
//scene.add(ambLight);
  
var bluePoint = new THREE.PointLight(0x0033ff, 3, 150);
bluePoint.position.set( 70, 5, 270 );
scene.add(bluePoint);
scene.add(new THREE.PointLightHelper(bluePoint, 3));
  
var greenPoint = new THREE.PointLight(0x33ff00, 1, 150);
greenPoint.position.set( -70, 5, 70 );
scene.add(greenPoint);
scene.add(new THREE.PointLightHelper(greenPoint, 3));

var spotLight;
var counter = 0;
  
spotLight = new THREE.SpotLight(0xffffff, 1, 500, 20, 10);
spotLight.position.set( 130, 150, 0 );
  
var spotTarget = new THREE.Object3D();
spotTarget.position.set(0, 0, 0);
spotLight.target = spotTarget;
spotLight.penumbra = 0.8; 
	
scene.add(spotLight);
scene.add(new THREE.PointLightHelper(spotLight, 1));	
	
//var hemLight = new THREE.HemisphereLight(0xffe5bb, 0xFFBF00, .1);
//scene.add(hemLight);	
//}


function addSceneElements() {
    // Create a cube used to build the floor and walls
    var cube = new THREE.CubeGeometry( 500, 1, 500);
	    var cube3 = new THREE.CubeGeometry( 200, 1, 200);

    var windowcube = new THREE.CubeGeometry( 100, 1, 200);

	
	
	
// var subjMat = new THREE.MeshBasicMaterial();
var subj;
var subjMat = new THREE.MeshPhongMaterial({
  color:0xF2461C, 
  shininess:11, 
  specular:0xEBC335, 
  shading: THREE.SmoothShading
  // shading: THREE.FlatShading
});
var subjMat_num2 = new THREE.MeshPhongMaterial({

  shininess:1, 
  specular:0xEBC335, 
  shading: THREE.SmoothShading
  // shading: THREE.FlatShading
});	
subjMat_num2.map = THREE.ImageUtils.loadTexture('images/deer/burgs.jpg');

	
subjMat_num2.bumpMap = THREE.ImageUtils.loadTexture('images/deer/burgers.jpg');
var itmArr = [];
var vx, vy, vz;

var loader = new THREE.JSONLoader(); // init the loader util



loader.load('images/deer/pot.js', function (geometry) {

	
    subj = new THREE.Mesh(geometry, subjMat_num2);
    subj.castShadow = true;
    geometry.computeVertexNormals();
    subj.scale.set(5,5,5);
	subj.position.set(-110, -250, -110);
subj.castShadow = true;
    subj.rotation.y = convertToRad(90);
    scene.add(subj);
	  

	
});
  
loader.load('images/deer/bean2.js', function (geometry) {

	
    subj = new THREE.Mesh(geometry, subjMat);
    subj.castShadow = true;
    geometry.computeVertexNormals();
    subj.scale.set(20,20,20);
	subj.position.set(0, -250, 50);
subj.castShadow = true;
    subj.rotation.y = convertToRad(90);
    scene.add(subj);
	  

	
});
  
  
  
  
    // create different materials
    var floorMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/floor.jpg') } );
	
	
	
var wallTexture = THREE.ImageUtils.loadTexture( '/responsive_shapes/images/aaa.svg' );
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set( 3, 3 );
var wallMat = new THREE.MeshBasicMaterial( { map: wallTexture } );
	
var wallTexture2 = THREE.ImageUtils.loadTexture( 'images/deer/brick.jpg' );
wallTexture2.wrapS = wallTexture2.wrapT = THREE.RepeatWrapping;
wallTexture2.repeat.set( 3, 3 );
var wallMat2 = new THREE.MeshBasicMaterial( { map: wallTexture2 } );
	
	
    var windowMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/deer/window1.jpg') } );

    var redMat = new THREE.MeshPhongMaterial( { color: 0xff3300, specular: 0x555555, shininess: 30 } );
    var purpleMat = new THREE.MeshPhongMaterial( { color: 0x6F6CC5, specular: 0x555555, shininess: 30 } );
  
    // Floor
    var floor = new THREE.Mesh(cube, floorMat );
    floor.position.set(0,-250,0);
    scene.add( floor );
  
    // Back wall
    var backWall = new THREE.Mesh(cube, wallMat );
    backWall.rotation.x = Math.PI/180 * 90;
    backWall.position.set(0,0,-250);
    scene.add( backWall );
  
    // Left wall
    var leftWall = new THREE.Mesh(cube, wallMat2 );
    leftWall.rotation.x = Math.PI/180 * 90;
    leftWall.rotation.z = Math.PI/180 * 90;
    leftWall.position.set(-250,0,0);
    scene.add( leftWall );

    var leftWall2 = new THREE.Mesh(cube3, wallMat );
    leftWall2.rotation.x = Math.PI/180 * 90;
    leftWall2.rotation.z = Math.PI/180 * 90;
    leftWall2.position.set(-350,100,0);
    leftWall2.castShadow = true;
    scene.add( leftWall2 );	
	
    // window
    var window = new THREE.Mesh(windowcube, windowMat );
    window.rotation.x = Math.PI/180 * 90;
    window.rotation.z = Math.PI/180 * 90;
    window.position.set(-250,0,0);
    scene.add( window );
	
	
	
    // Right wall
    var rightWall = new THREE.Mesh(cube, wallMat );
    rightWall.rotation.x = Math.PI/180 * 90;
    rightWall.rotation.z = Math.PI/180 * 90;
    rightWall.position.set(250,0,0);
    scene.add( rightWall );
  
    // Sphere
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 70, 20), redMat);
    sphere.position.set(-25, 100, -20);
    scene.add(sphere);
  
    // Knot thingy
    var knot = new THREE.Mesh(new THREE.TorusKnotGeometry( 40, 3, 100, 16 ), purpleMat);
    knot.position.set(0, 60, 30);
    scene.add(knot);
}
  
function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );  
    controls.update();
	
counter += .1;
spotLight.target.position.x = Math.sin(counter) * 100;
}
  
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}



function update(){
 //
  if(subj){
//
    movement();   
	  	controls.update();

  }
}

function convertToRad(deg){
  return deg*Math.PI/180;
}

function randNum(n){
  var p = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
  return p*n;
}
