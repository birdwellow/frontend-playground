(function ($, window, document, THREE) {

  'use strict';

  $(function () {

    var definitions = [
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
    ];

    new THREE.Room("#WebGL-output", definitions);

  });

})(jQuery, window, document, THREE);
