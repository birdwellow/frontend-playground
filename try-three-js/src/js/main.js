(function ($, window, document, THREE) {

  'use strict';

  $(function () {

    var definitions = [
      // {
      //   type: "extrude",
      //   points: [
      //     [0, 0],
      //     [30, 0],
      //     [30, 10],
      //     [15, 15],
      //     [0, 15]
      //   ],
      //   position: [-10, -10, -10]
      // },
      // {
      //   type: "cylinder",
      //   radii: [6, 4],
      //   height: 50,
      //   position: [70, 0, -10],
      //   rotation: [0, 0, 91]
      // }
      // {
      //   "type": "box",
      //   "dimensions": [90, 16, 45]
      // },
      {
        type: "extrude",
        points: [
          [-45, 0],
          [65, 0],
          [65, 10],
          [30, 15],
          [-45, 15]
        ],
        width: 44,
        position: [0, -10, -22]
      },
      {
        "type": "box",
        "dimensions": [60, 20, 15],
        "position": [-20, 2.5, -10]
      },
      {
        "type": "box",
        "dimensions": [60, 20, 15],
        "position": [-20, 2.5, 10]
      },
      {
        "type": "cylinder",
        "radii": [5, 3],
        "height": 60,
        "position": [60, 2, 10],
        "rotation": [0, 0, 92]
      },
      {
        "type": "cylinder",
        "radii": [5, 3],
        "height": 60,
        "position": [60, 2, -10],
        "rotation": [0, 0, 92]
      },
      {
        "type": "cylinder",
        "radii": [20, 20],
        "height": 5,
        "position": [0, -13, 0]
      }
    ];

    new THREE.Room("#WebGL-output", definitions);

  });

})(jQuery, window, document, THREE);
