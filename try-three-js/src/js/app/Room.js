(function ($, window, document, THREE) {

  'use strict';


  var element,
    scene,
    camera,
    cameraControl,
    renderer,
    object;


  function render() {
    // object.rotateY(0.01);
    cameraControl.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function createRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    return renderer;
  }

  function createCamera(sceneToLookAt) {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 100;
    camera.lookAt(sceneToLookAt.position);
    cameraControl = new THREE.OrbitControls(camera);
    return camera;
  }

  function createDirectionalLight() {
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100, 50, -10);
    light.name = 'directional';
    return light;
  }

  function createAmbientLight() {
    var light = new THREE.AmbientLight(0x333333);
    return light;
  }

  function addToScene(definitions) {
    try {
      object = THREE.JsonConfigurableMeshCompounder.create(definitions);
      scene.add(object);
    } catch (e) {
      console.error(e);
    }
  }

  THREE.Room = function(elementSelector, definitions) {
    renderer = createRenderer();

    scene = new THREE.Scene();
    camera = createCamera(scene);

    addToScene(definitions);

    scene.add(createDirectionalLight());
    scene.add(createAmbientLight());

    document.querySelector(elementSelector).append(renderer.domElement);

    render();

    this.update = function (newDefinitions) {
      scene.remove(object);
      addToScene(definitions);
    }

  };

})(jQuery, window, document, THREE);
