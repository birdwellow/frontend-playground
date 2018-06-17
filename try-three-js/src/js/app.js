(function () {

  const WIDTH = 600;
  const HEIGHT = 400;

// Set some camera attributes.
  const VIEW_ANGLE = 45;
  const ASPECT = WIDTH / HEIGHT;
  const NEAR = 0.1;
  const FAR = 10000;

// Get the DOM element to attach to
  const container =
    document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
  const renderer = new THREE.WebGLRenderer();
  const camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR
    );

  const scene = new THREE.Scene();

// Add the camera to the scene.
  scene.add(camera);

// Start the renderer.
  renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
  container.appendChild(renderer.domElement);





  var controls = new THREE.OrbitControls(camera, container);

  camera.position.z = 300;

  controls.update();




  // Set up the sphere vars
  const RADIUS = 50;
  const SEGMENTS = 16;
  const RINGS = 16;


// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
  const sphere = new THREE.Mesh(

    new THREE.SphereGeometry(
      RADIUS,
      SEGMENTS,
      RINGS),

    new THREE.MeshLambertMaterial({
      color: 0xCC0000
    })
  );
  sphere.position.x = -50;


  const box1 = new THREE.Mesh(

    new THREE.BoxGeometry(
      RADIUS/2,
      RADIUS/2,
      RADIUS/2),

    new THREE.MeshLambertMaterial({
      color: 0x0000FF
    })
  );

  box1.position.x = 50;
  // box1.position.z = 80;


  const box2 = new THREE.Mesh(

    new THREE.BoxGeometry(
      RADIUS*10,
      RADIUS*10,
      1),

    new THREE.MeshLambertMaterial({
      color: 0x00FF00
    })
  );

  box2.position.z = -80;


// Finally, add the sphere to the scene.
  scene.add(sphere);
  scene.add(box1);
  scene.add(box2);

  sphere.receiveShadow = true;
  sphere.castShadow = true;
  box1.receiveShadow = true;
  box1.castShadow = true;

  box2.receiveShadow = true;
  box2.castShadow = true;

  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;



  // const light = new THREE.PointLight(0xFFFFFF);
  const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);

// set its position
  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 130;
  light.castShadow = true;

  // light.target.position = box2;
  light.target.position.set(0, 0, 0);

  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 5000;
  light.shadow.camera.left = -500;
  light.shadow.camera.bottom = -500;
  light.shadow.camera.right = 500;
  light.shadow.camera.top = 500;


// add to the scene
  scene.add(light);





  renderer.render(scene, camera);

  function update () {
    // Draw!
    renderer.render(scene, camera);
    controls.update();

    // Schedule the next frame.
    requestAnimationFrame(update);
  }

// Schedule the first frame.
  requestAnimationFrame(update);

})();
