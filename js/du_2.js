//   name: 'rainbow',
//   values: ['58C1DA', '30A135', 'EBC335', 'F2461C', 'D72827', 'CCCCCC']
// }, {
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

				var container = document.getElementById( 'container' );
				container.appendChild( renderer.domElement );



				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // remove when using animation loop
				// enable animation loop when using damping or autorotation
				//controls.enableDamping = true;
				//controls.dampingFactor = 0.25;
				controls.enableZoom = false;



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );




window.addEventListener( 'resize', onWindowResize, false );

			function onWindowResize() {
				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
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
					container.appendChild( renderer.domElement );

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


function onDocumentMouseMove( event ) {

    event.preventDefault();

    if ( isMouseDown ) {

        theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 )
                + onMouseDownTheta;
        phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 )
              + onMouseDownPhi;

        phi = Math.min( 180, Math.max( 0, phi ) );

        camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
        camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
                            * Math.cos( phi * Math.PI / 360 );
        camera.updateMatrix();

    }

    mouse3D = projector.unprojectVector(
        new THREE.Vector3(
            ( event.clientX / renderer.domElement.width ) * 2 - 1,
            - ( event.clientY / renderer.domElement.height ) * 2 + 1,
            0.5
        ),
        camera
    );
    ray.direction = mouse3D.subSelf( camera.position ).normalize();

    interact();
    render();

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



