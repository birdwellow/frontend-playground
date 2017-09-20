(function ($, window, document, THREE) {

  'use strict';

  $(function () {

    var definition = {
      "type": "compound",
      "definitions": [
        {
          "type": "box",
          "dimensions": [200, 2, 100]
        },
        {
          "type": "box",
          "dimensions": [50, 5, 65],
          "position": [-85, 2, 17.5]
        }
      ],
      // "position": [50, 50, 50],
      "rotation": [5, 5, 5],
    };

    // definition = [
    //   {
    //     "type": "box",
    //     "dimensions": [200, 2, 100]
    //   },
    //   {
    //     "type": "box",
    //     "dimensions": [50, 5, 65],
    //     "position": [-85, 2, 17.5]
    //   }
    // ];

    new THREE.Room("#WebGL-output", definition);

  });

})(jQuery, window, document, THREE);
