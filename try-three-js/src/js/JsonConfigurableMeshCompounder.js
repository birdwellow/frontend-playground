(function (global) {

  var createBoxGeometry = function (dimensions) {
    return new THREE.BoxGeometry(
      dimensions[0],
      dimensions[1],
      dimensions[2]
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

  var createMesh = function (geometry, definition) {
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    if (definition.position) {
      mesh.position.set(
        definition.position[0],
        definition.position[1],
        definition.position[2]
      );
    }
    if (definition.rotation) {
      mesh.rotateX(definition.rotation[0]/180*Math.PI);
      mesh.rotateY(definition.rotation[1]/180*Math.PI);
      mesh.rotateZ(definition.rotation[2]/180*Math.PI);
    }

    return mesh;
  };

  var rotate = function (mesh, rotations) {

  };

  var createBox = function (boxDefinition) {
    var boxGeometry = createBoxGeometry(boxDefinition.dimensions);
    var box = createMesh(boxGeometry, boxDefinition);
    return box;
  };

  var createCylinder = function (cylinderDefinition) {
    var geometry = createCylinderGeometry(cylinderDefinition);
    var mesh = createMesh(geometry, cylinderDefinition);
    return mesh;
  };

  var createByType = function (definition) {
    var type = definition.type;
    switch (type) {
      case ("box"): return createBox(definition);
      case ("cylinder"): return createCylinder(definition);
      default: throw new InstantiationException('"' + type + '" is not a valid type');
    }
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
