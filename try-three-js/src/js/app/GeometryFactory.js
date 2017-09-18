(function (THREE) {

  'use strict';


  var factories = {

    "box": createBoxGeometry = function (definition) {
      return new THREE.BoxGeometry(
        definition.dimensions[0],
        definition.dimensions[1],
        definition.dimensions[2]
      );
    },

    "cylinder": function (definition) {
      return new THREE.CylinderGeometry(
        definition.radii[0],
        definition.radii[1],
        definition.height,
        20
      );
    },

    "extrude": function (definition) {
      var points = definition.points;
      var firstPoint = points[0];

      var shape = new THREE.Shape();
      shape.moveTo(firstPoint [0], firstPoint [1]);
      for (var i in points) {
        var point = points[i];
        shape.lineTo(point[0], point[1]);
      }

      var extrudeSettings = {
        steps: definition.steps || 20,
        amount: definition.amount || 20,
        bevelEnabled: definition.bevelEnabled || true,
        bevelThickness: 1 || definition.bevelThickness || 1,
        bevelSize: definition.bevelSize || 1,
        bevelSegments: 1 || definition.bevelSegments || 1
      };

      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

  };

  THREE.GeometryFactory = {

    createFromDefinition: function (definition) {
      var type = definition.type;
      if (!type) {
        throw new InstantiationException('"' + type + '" is not a valid type');
      }

      var factory = factories[type];

      if(!factory){
        throw new InstantiationException('No factory exists for type "' + type + '"');
      }

      return factory(definition);
    }

  };

}) (THREE);
