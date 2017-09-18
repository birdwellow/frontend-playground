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

  var createMesh = function (geometry, definition) {
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    translate(mesh, definition.position);
    rotate(mesh, definition.rotation);
    return mesh;
  };

  var createByType = function (definition) {
    var type = definition.type;
    var geometry = THREE.GeometryFactory.createFromDefinition(definition);
    var mesh = createMesh(geometry, definition);
    return mesh;
  };

  THREE.JsonConfigurableMeshCompounder = {

    create: function (definitions) {
      var meshes = [];
      meshes.push(THREE.GeometryFactory.createCenter());
      for (var i in definitions) {
        var definition = definitions[i];
        meshes.push(createByType(definition));
      }
      return new THREE.CompoundMesh(meshes);
    }

  };

}) (THREE);
