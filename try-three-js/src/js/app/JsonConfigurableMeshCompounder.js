(function (THREE) {

  'use strict';


  var translate = function (mesh, position) {
    if (Array.isArray(position)) {
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

  var positionAndAdjustMesh = function (mesh, definition) {
    translate(mesh, definition.position);
    rotate(mesh, definition.rotation);
  };

  var createMesh = function (geometry, definition) {
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    positionAndAdjustMesh(mesh, definition);
    return mesh;
  };

  var createMeshByType = function (definition) {
    var geometry = THREE.GeometryFactory.createFromDefinition(definition);
    var mesh = createMesh(geometry, definition);
    return mesh;
  };

  // TODO: Use in the next step with referenced definitions
  // var copyObjectFields = function(sourceObject, targetObject, fieldsToSkip) {
  //   for (var key in sourceObject) {
  //     if(Array.isArray(fieldsToSkip) && fieldsToSkip.indexOf(key) === -1) {
  //       var value = sourceObject[key];
  //       targetObject[key] = value;
  //     }
  //   }
  // };

  var createMeshes = function (definitions) {
    var meshes = [];
    meshes.push(THREE.GeometryFactory.createCenter());
    for (var i in definitions) {
      var partialDefinition = definitions[i];
      meshes.push(createMeshByType(partialDefinition));
    }
    return meshes;
  };

  var createCompoundMesh = function (definitions) {
    var meshes = createMeshes(definitions);
    var mesh = new THREE.CompoundMesh(meshes);
    positionAndAdjustMesh(mesh, definitions);
    return mesh;
  };

  THREE.JsonConfigurableMeshCompounder = {

    create: function (definition) {
      if (Array.isArray(definition)) {
        return createCompoundMesh(definition);
      } else if (definition.type === "compound") {
        return createCompoundMesh(definition.definitions);
      }
    }

  };

}) (THREE);
