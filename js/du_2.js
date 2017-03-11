//   name: 'rainbow',
//   values: ['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']
// }, {
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
window.addEventListener( 'resize', onWindowResize, false );

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

camera.position.z = 250;
camera.position.y = 20;
//
// var subjMat = new THREE.MeshBasicMaterial();
var subj;
var subjMat = new THREE.MeshPhongMaterial({
  color:0xF2461C, 
  shininess:11, 
  specular:0xEBC335, 
  shading: THREE.SmoothShading
  // shading: THREE.FlatShading
});
subjMat.map = THREE.ImageUtils.loadTexture('images/deer/floor.jpg');
subjMat.side = THREE.BackSide;
subjMat.bumpMap = THREE.ImageUtils.loadTexture('images/deer/burgers.jpg');
var itmArr = [];
var vx, vy, vz;

var loader = new THREE.JSONLoader(); // init the loader util



loader.load('images/deer/pot.js', function (geometry) {
  
    subj = new THREE.Mesh(geometry,subjMat);
    subj.castShadow = true;
    geometry.computeVertexNormals();
    subj.scale.set(20,20,20);
	subj.position.set(0, 0, 50);

    subj.rotation.y = convertToRad(90);
    scene.add(subj);
});


	// Create an array of materials to be used in a cube, one for each side
	var cubeMaterialArray = [];
	// order to add materials: x+,x-,y+,y-,z+,z-
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
	cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
	var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
	// Cube parameters: width (x), height (y), depth (z), 
	//        (optional) segments along x, segments along y, segments along z
	var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1 );
	// using THREE.MeshFaceMaterial() in the constructor below
	//   causes the mesh to use the materials stored in the geometry
	cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
	cube.position.set(-200, 50, -50);
	scene.add( cube );


var spotlight = new THREE.PointLight(0xffffff);
spotlight.position.set(-20,30,55);

scene.add(spotlight);

var light2 = new THREE.PointLight(0x30A135);
light2.position.set(20,30,5);

scene.add(light2);

	controls = new THREE.OrbitControls( camera, renderer.domElement );


	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

	// FLOOR
    var wallMat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/foor.jpg') } )
	var leftWall = new THREE.Mesh(cube, wallMat );
    leftWall.rotation.x = Math.PI/180 * 90;
    leftWall.rotation.z = Math.PI/180 * 90;
    leftWall.position.set(-100,100,0);
	scene.add(leftWall);



//
var render = function () {
  requestAnimationFrame( render );

  update();

  renderer.render(scene, camera);
};

render();

window.ondevicemotion = function(e) {
      vx = event.accelerationIncludingGravity.x/12;
      vy = event.accelerationIncludingGravity.y/12;
      vz = event.accelerationIncludingGravity.z/12;
}

function movement(){
   subj.rotation.x += convertToRad(vz);
  subj.rotation.y += convertToRad(vx);
  subj.rotation.z += convertToRad(-vy);
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



