(function (global) {

  var createBoxGeometry = function (definition) {
    return new THREE.BoxGeometry(
      definition.dimensions[0],
      definition.dimensions[1],
      definition.dimensions[2]
    );
  };

  var createCylinderGeometry = function (definition) {
    return new THREE.CylinderGeometry(
      definition.radii[0],
      definition.radii[1],
      definition.height,
      20
    );
  };

  var createExtrudeGeometry = function (definition) {
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

    return new THREE.ExtrudeGeometry( shape, extrudeSettings );
  };

  var createMesh = function (geometry, definition) {
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    translate(mesh, definition.position);
    rotate(mesh, definition.rotation);

    return mesh;
  };

  var translate = function (mesh, position) {
    if (Array.isArray(position)) {
      console.log("Considering position: " + position);
      mesh.position.set(
        position[0],
        position[1],
        position[2]
      );
    }
  };

  var rotate = function (mesh, rotation) {
    if (Array.isArray(rotation)) {
      mesh.rotateX(rotation[0]/180*Math.PI);
      mesh.rotateY(rotation[1]/180*Math.PI);
      mesh.rotateZ(rotation[2]/180*Math.PI);
    }
  };

  var createByType = function (definition) {
    var type = definition.type;

    var factories = {
      "box": createBoxGeometry,
      "cylinder": createCylinderGeometry,
      "extrude": createExtrudeGeometry
    };

    var factory = factories[type];
    if(!factory){
      throw new InstantiationException('"' + type + '" is not a valid type');
    }

    var geometry = factory(definition);
    var mesh = createMesh(geometry, definition);
    return mesh;
  };

  THREE.JsonConfigurableMeshCompounder = {

    create: function (definitions) {
      var meshes = [];
      for (var i in definitions) {
        var definition = definitions[i];
        meshes.push(createByType(definition));
      }
      return new THREE.CompoundMesh(meshes);
    }

  };


}) (window);
