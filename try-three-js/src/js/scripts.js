(function ($, window, document) {

  'use strict';

  $(function () {
    var scene,
      camera,
      cameraControl,
      renderer,

      earth,
      clouds;

    function createRenderer() {
      var renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0x000000, 1.0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMapEnabled = true;
      return renderer;
    }

    function createCamera(sceneToLookAt) {
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.x = 30;
      camera.position.y = 0;
      camera.position.z = 30;
      camera.lookAt(sceneToLookAt.position);
      cameraControl = new THREE.OrbitControls(camera);
      return camera;
    }

    function createEarth() {
      var earthTexture = new THREE.ImageUtils.loadTexture('assets/earthmap4k.jpg');
      var earthGeometry = new THREE.SphereGeometry(15, 30, 30);
      var earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture
      });
      var earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      earthMesh.name = 'earth';

      return earthMesh;
    }

    function createClouds() {
      var cloudTexture = new THREE.ImageUtils.loadTexture('assets/fair_clouds_4k.png');
      var cloudGeometry = new THREE.SphereGeometry(15 * 1.01, 30, 30);
      var cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true
      });
      var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

      return cloudMesh;
    }

    function createDirectionalLight() {
      var light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(100, 50, -10);
      light.name = 'directional';
      return light;
    }

    function createAmbientLight() {
      var light = new THREE.AmbientLight(0x111111);
      return light;
    }

    function createBackground() {
      var backgroundCamera = new THREE.OrthographicCamera(
        -window.innerWidth,
        window.innerWidth,
        window.innerHeight,
        -window.innerHeight,

        -10000,
        10000
      );
      backgroundCamera.position.z = 50;
    }

    function init() {
      renderer = createRenderer();

      scene = new THREE.Scene();
      camera = createCamera(scene);
      earth = createEarth();
      clouds = createClouds();

      scene.add(earth);
      scene.add(clouds);
      scene.add(createDirectionalLight());
      scene.add(createAmbientLight());

      document.getElementById("WebGL-output").append(renderer.domElement);

      render();
    }

    function render() {
      cameraControl.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    function update() {
      render();
    }

    window.onload = init;

  });

})(jQuery, window, document, THREE);
