(function ($, window, document) {

  'use strict';

  $(function () {
    var scene,
      camera,
      cameraControl,
      renderer,

      object;

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

    function init() {
      renderer = createRenderer();

      scene = new THREE.Scene();
      camera = createCamera(scene);

      try {
        object = THREE.JsonConfigurableMeshCompounder.create([
          // {
          //   type: "box",
          //   dimensions: [90, 16, 45]
          // },
          // {
          //   type: "box",
          //   dimensions: [60, 20, 15],
          //   position: [-20, 2.5, -10]
          // },
          // {
          //   type: "box",
          //   dimensions: [60, 20, 15],
          //   position: [-20, 2.5, 10]
          // },
          // {
          //   type: "cylinder",
          //   radii: [6, 4],
          //   height: 50,
          //   position: [70, 0, 10],
          //   rotation: [0, 0, 91]
          // },
          {
            type: "extrude",
            points: [
              [0, 0],
              [30, 0],
              [30, 10],
              [15, 15],
              [0, 15]
            ],
            position: [10, 10, 10]
          },
          {
            type: "cylinder",
            radii: [6, 4],
            height: 50,
            position: [70, 0, -10],
            rotation: [0, 0, 91]
          }
        ]);

        scene.add(object);
      } catch (e) {
        console.error(e);
      }

      scene.add(createDirectionalLight());
      scene.add(createAmbientLight());

      document.getElementById("WebGL-output").append(renderer.domElement);

      render();
    }

    function render() {
      // object.rotateY(0.01);
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
