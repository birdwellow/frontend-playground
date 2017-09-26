L3DEditor = (function (L3DEditor) {

  L3DEditor.defaultDefinition = {
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
          }
        ],
        "position": [-85, 2, 17.5]
      },
      {
        "type": "ref",
        "name": "cannon",
        "position": [0, 0, 0],
        "repeat": {
          "times": 13,
          "position": [0, +50, 0],
          "rotation": [0, +5, 0]
        }
      }
    ],
    // "position": [50, 50, 50],
    "rotation": [5, 5, 5],
  };

})(L3DEditor || {});
