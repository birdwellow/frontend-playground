(function ($, window, document, THREE) {

  'use strict';

  $(function () {

    var testDefinition = {
      "type": "composite",
      "parts": [
        {
          "type": "box",
          "dimensions": [200, 2, 100]
        },
        {
          "type": "composite",
          "parts": [
            {
              "type": "cylinder",
              "radii": [10, 15],
              "height": 10
            },
            {
              "type": "ref",
              "name": "plate",
              "position": [5, 5, 5],
              "rotation": [0, 45, 90],
            },
            {
              "type": "composite",
              "parts": [
                {
                  "type": "sphere",
                  "radius": 13,
                  "position": [1, 2, 4]
                }
              ]
            }
          ],
          "position": [-85, 2, 17.5]
        },
        {
          "type": "ref",
          "name": "cannon"
        }
      ],
      // "position": [50, 50, 50],
      "rotation": [5, 5, 5],
    };

    /*

    Simple type (box, sphere etc.):
    {
      "type": "box",
      ...
    }

     Composite type:
     {
     "type": "composite",
     "parts": []
     }

     Reference type:
     {
     "type": "ref",
     "name": "..."
     }
     */


    try {
      console.log(THREE.DefinitionService.compile(testDefinition));
    } catch (e) {
      console.error(e.message);
      console.error(e);
    }

    // new THREE.Room("#WebGL-output", definition);

  });

})(jQuery, window, document, THREE);
