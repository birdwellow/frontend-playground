(function ($, window, document, THREE) {

  'use strict';

  var test = function (definition) {
    try {
      console.log(THREE.DefinitionService.compile(definition));
    } catch (e) {
      console.error(e.message);
      console.error(e);
    }
  };

  $(function () {

    var testDefinition = {
      "type": "composite",
      "definitions": [
        {
          "type": "box",
          "dimensions": [200, 2, 100]
        },
        {
          "type": "composite",
          "definitions": [
            {
              "type": "cylinder",
              "radii": [10, 15],
              "height": 10
            },
            {
              "type": "ref",
              "name": "plate"
            },
            {
              "type": "composite",
              "definitions": [
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
    test(testDefinition);

    testDefinition = [
      {
        "type": "box",
        "dimensions": [200, 2, 100]
      },
      {
        "type": "box",
        "dimensions": [50, 5, 65],
        "position": [-85, 2, 17.5]
      }
    ];
    // test(testDefinition);

    // testDefinition = {
    //   "type": "ref",
    //   "name": "cannon"
    // };
    // test(testDefinition);

    /*

    Simple type (box, sphere etc.):
    {
      "type": "box",
      ...
    }

     Composite type:
     {
     "type": "composite",
     "definitions": []
     }

     Reference type:
     {
     "type": "ref",
     "name": "..."
     }
     */

    // new THREE.Room("#WebGL-output", definition);

  });

})(jQuery, window, document, THREE);
