import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

class ThreeScene extends Component {
  componentDidMount() {



    this.isUserInteracting = false;
    this.onMouseDownMouseX = 0;
    this.onMouseDownMouseY = 0;
    this.lon = 0;
    this.onMouseDownLon = 0;
    this.lat = 0;
    this.onMouseDownLat = 0;
    this.phi = 0;
    this.theta = 0;
    this.markers = []; this.markersCounter = 0;

  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();
  this.intersects = [];

    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(this.mount.devicePixelRatio);
    this.renderer.setClearColor('white');
    this.renderer.setSize(this.width, this.height);
    this.mount.appendChild(this.renderer.domElement);



    this.spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(
        "https://cywarr.github.io/small-shop/Marker.png"
      )
    });

    // Add Mouse Listener 


    document.addEventListener("mousedown", this.onPointerStart, false);
    document.addEventListener("mousemove", this.onPointerMove, false);
    document.addEventListener("mouseup", this.onPointerUp, false);
    document.addEventListener("wheel", this.onDocumentMouseWheel, false);
    document.addEventListener("touchstart", this.onPointerStart, false);
    document.addEventListener("touchmove", this.onPointerMove, false);
    document.addEventListener("touchend", this.onPointerUp, false);
    document.body.addEventListener( 'mousewheel', this.mousewheel, false );
    document.body.addEventListener( 'DOMMouseScroll', this.mousewheel, false );

    document.addEventListener(
      "dragover",
      function(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      },
      false
    );
    document.addEventListener(
      "dragenter",
      function() {
        document.body.style.opacity = 0.5;
      },
      false
    );
    document.addEventListener(
      "dragleave",
      function() {
        document.body.style.opacity = 1;
      },
      false
    );
    document.addEventListener(
      "drop",
      function(event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.addEventListener(
          "load",
          function(event) {
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
          },
          false
        );
        reader.readAsDataURL(event.dataTransfer.files[0]);
      document.body.style.opacity = 1;
    },
    false
  );
  document.addEventListener("resize", this.onWindowResize, false);
  
  document.addEventListener(
    "dblclick",
    event => {
      this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      let marker = new THREE.Sprite(this.spriteMaterial);
      marker.scale.set(20, 20, 1);
      marker.name = "marker" + this.markersCounter;
      this.raycaster.ray.at(210, marker.position);
      this.scene.add(marker);
      this.markers.push(marker);
      this.markersCounter++;
    },
    false
  );






   // Add Camera 

   this.camera = new THREE.PerspectiveCamera(
    75,
    this.width / this.height,
    1,
    1100
  );
this.camera.position.y = -100; 
this.camera.position.z = 100; 
this.camera.rotation.x = 45 * (Math.PI / 180); 
this.camera.target = new THREE.Vector3(0, 0, 0);

  // Add Scene

  this.scene = new THREE.Scene();
  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

 // Adding Image 

 alert(params.get('image'))

 var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg"
  )
});
this.controls = new OrbitControls( this.camera, this.renderer.domElement );
this.camera.position.set( 0, 20, 100 );
this.controls.update();
this.mesh = new THREE.Mesh(geometry, material);
this.scene.add(this.mesh);


// ADD CAMERA

// this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000); 
// this.camera.position.y = -100; 
// this.camera.position.z = 100; 
// this.camera.rotation.x = 45 * (Math.PI / 180); 

// ADD SCENE

//  scene 
//  this.scene = new THREE.Scene();
//  this.scene.add(this.camera); 

    // //ADD SCENE
    // this.scene = new THREE.Scene();
    //ADD CAMERA
    // this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // this.camera.position.z = 4;
    // ADD CUBE
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
    // this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    // Adding Image
    // var loader = new THREE.TextureLoader();
    // var material = new THREE.MeshLambertMaterial({
    //   map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
    // });
    // var geometry = new THREE.PlaneGeometry(10, 10*.75);
    // this.cube = new THREE.Mesh(geometry, material);
    // this.cube.position.set(0,0,0)    
    // this.scene.add(this.cube);
    // var light = new THREE.PointLight( 0xffffff, 1, 0 );
    // light.position.set(1, 1, 100 );    
    // this.scene.add(light)


    // Adding image 

  //   var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
  //     map:THREE.ImageUtils.loadTexture('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg')
  // });
  // img.map.needsUpdate = true;

  // Adding Plane 

  // this.plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),img);
  // this.plane.overdraw = true;
  // this.scene.add(this.plane);


  // Adding Subtitle and Plane 

  // this.ambientLight = new THREE.AmbientLight(0x555555);
  // this.scene.add(this.ambientLight);

  // // add directional light source
  // this.directionalLight = new THREE.DirectionalLight(0xffffff);
  // this.directionalLight.position.set(1, 1, 1).normalize();
  // this.scene.add(this.directionalLight);
    this.start();
  }

  //   addModels() {
  //     // -----Step 1--------
  //     const windowUrl = window.location.search;
  //     const params = new URLSearchParams(windowUrl);
  //     alert(params.get('image'))
  //     console.log("this.props.match", params.get('image'))
  //     window.addEventListener('message', function(event){
  //         console.log("ebent message>>>>>",event)
  //     });
  //     const geometry = new THREE.BoxGeometry(5, 5, 5);
  //     const material = new THREE.MeshBasicMaterial({
  //       color: '#0F0'
  //     });
  //     this.cube = new THREE.Mesh(geometry, material);
  //     // this.scene.add(this.cube);

  //     // -----Step 2--------
  //     //LOAD TEXTURE and on completion apply it on SPHERE

  //     // var loader = new THREE.ImageLoader();
  //     // loader.load(
  //     //     // resource URL
  //     //     'https://cdn.mos.cms.futurecdn.net/YxPpYyt9w6bHRqCKTwxfUA-970-80.jpg.webp',

  //     //     // onLoad callback
  //     //     function ( image ) {
  //     //         // use the image, e.g. draw part of it on a canvas
  //     //         var canvas = document.createElement( 'canvas' );
  //     //         var context = canvas.getContext( '2d' );
  //     //         context.drawImage( image, 100, 100 );
  //     //     },

  //     //     // onProgress callback currently not supported
  //     //     undefined,

  //     //     // onError callback
  //     //     function () {
  //     //         console.error( 'An error happened.' );
  //     //     }
  //     // );

  //     var spriteMap = new THREE.TextureLoader().load(params.get('image').toString());
  // var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
  // var sprite = new THREE.Sprite( spriteMaterial );
  // this.scene.add( sprite );
  //     // new THREE.TextureLoader().load(
  //     //     params.get('image'),
  //     //   texture => {
  //     //     //Update Texture
  //     //     this.cube.material.map = texture;
  //     //     this.cube.material.needsUpdate = true;
  //     //   },
  //     //   xhr => {
  //     //     //Download Progress
  //     //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  //     //   },
  //     //   error => {
  //     //     //Error CallBack
  //     //     console.log('An error happened' + error);
  //     //   }
  //     // );

  //     // -----Step 4--------
  //     //Loading 3d Models
  //     //Loading Material First
  //     var mtlLoader = new MTLLoader();
  //     mtlLoader.setBaseUrl('./assets/');
  //     mtlLoader.load('freedom.mtl', materials => {
  //       materials.preload();
  //       console.log('Material loaded');
  //       //Load Object Now and Set Material
  //       var objLoader = new OBJLoader();
  //       objLoader.setMaterials(materials);
  //       objLoader.load(
  //         './assets/freedom.obj',
  //         object => {
  //           this.freedomMesh = object;
  //           this.freedomMesh.position.setY(3); //or  this
  //           this.freedomMesh.scale.set(0.02, 0.02, 0.02);
  //           this.scene.add(this.freedomMesh);
  //         },
  //         xhr => {
  //           console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  //         },
  //         // called when loading has errors
  //         error => {
  //           console.log('An error happened' + error);
  //         }
  //       );
  //     });
  //   }

  mousewheel = ( e ) => {      
    var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):e.detail);
    d = 100 * ((d>0)?1:-1);

    var cPos = this.camera.position;
    if (isNaN(cPos.x) || isNaN(cPos.y) || isNaN(cPos.y))
      return;

    var r = cPos.x*cPos.x + cPos.y*cPos.y;
    var sqr = Math.sqrt(r);
    var sqrZ = Math.sqrt(cPos.z*cPos.z + r);


    var nx = cPos.x + ((r==0)?0:(d * cPos.x/sqr));
    var ny = cPos.y + ((r==0)?0:(d * cPos.y/sqr));
    var nz = cPos.z + ((sqrZ==0)?0:(d * cPos.z/sqrZ));

    if (isNaN(nx) || isNaN(ny) || isNaN(nz))
      return;

    cPos.x = nx;
    cPos.y = ny;
    cPos.z = nz;
}


  onWindowResize = () => {
    alert("resize")
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  onPointerStart = (event) => {
    this.isUserInteracting = true;
    var clientX = event.clientX || event.touches[0].clientX;
    var clientY = event.clientY || event.touches[0].clientY;
    this.onMouseDownMouseX = clientX;
    this.onMouseDownMouseY = clientY;
    this.onMouseDownLon = this.lon;
    this.onMouseDownLat = this.lat;
    
    // Deletion
    this.mouse.x = clientX / window.innerWidth * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    this.intersects = this.raycaster.intersectObjects(this.markers);
    
    if (this.intersects.length > 0){
      let obj = this.intersects[0];
      let uv = obj.uv;
      if (Math.min(uv.x, uv.y) > 0.75) { 
        obj.object.visible = false; // you have to do the stuff for real clearance
      }
    }
    
    
  }

  onPointerMove =(event) => {
    if (this.isUserInteracting === true) {
      var clientX = event.clientX || event.touches[0].clientX;
      var clientY = event.clientY || event.touches[0].clientY;
      this.lon = (this.onMouseDownMouseX - clientX) * 0.1 + this.onMouseDownLon;
      this.lat = (clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;
    }
  }

  onPointerUp = () => {
    this.isUserInteracting = false;
  }

  onDocumentMouseWheel = (event) => {
    var fov = this.camera.fov + event.deltaY * 0.05;
    this.camera.fov = THREE.Math.clamp(fov, 10, 75);
    this.camera.updateProjectionMatrix();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    // -----Step 3--------
    //Rotate Models


  this.frameId = window.requestAnimationFrame(this.animate);
  this.update();
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    // this.cube.rotation.z += 0.01;
    // this.renderScene();
    // this.frameId = window.requestAnimationFrame(this.animate);
  };

  update = () => {
    if (this.isUserInteracting === false) {
      //lon += 0.1;
    }
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.Math.degToRad(90 - this.lat);
    this.theta = THREE.Math.degToRad(this.lon);
    this.camera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.target.y = 500 * Math.cos(this.phi);
    this.camera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
    this.camera.lookAt(this.camera.target);
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.01;
    // this.mesh.rotation.z += 0.01;
    /*
                  // distortion
                  camera.position.copy( camera.target ).negate();
                  */
    this.controls.update();             
    this.renderer.render(this.scene, this.camera);
  }
  // renderScene = () => {
  //   if (this.renderer) this.renderer.render(this.scene, this.camera);
  // };

  render() {
    return (
      <div
        style={{ width: '800px', height: '800px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default ThreeScene;
