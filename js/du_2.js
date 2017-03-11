//   name: 'rainbow',
//   values: ['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']
// }, {
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container = document.getElementById( 'jazz' );


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

container.appendChild( renderer.domElement );
// CONTROLS
controls = new THREE.OrbitControls( camera, renderer.domElement );

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener( 'resize', onWindowResize, false );

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function onDocumentMouseMove( event ) {
				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;
			}


camera.position.z = 250;
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
subjMat.bumpMap = THREE.ImageUtils.loadTexture('images/deer/deerBump.jpg');
var itmArr = [];
var vx, vy, vz;

var loader = new THREE.JSONLoader(); // init the loader util

loader.load('images/deer/pot.js', function (geometry) {
  
    subj = new THREE.Mesh(geometry,subjMat);
    geometry.computeVertexNormals();
    subj.scale.set(2,2,2);
    subj.rotation.y = convertToRad(90);
    scene.add(subj);
    
  
});
var spotlight = new THREE.PointLight(0xffffff);
spotlight.position.set(-20,30,55);

scene.add(spotlight);

var light2 = new THREE.PointLight(0x30A135);
light2.position.set(20,30,5);

scene.add(light2);





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
  }
}

function convertToRad(deg){
  return deg*Math.PI/180;
}

function randNum(n){
  var p = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
  return p*n;
}



