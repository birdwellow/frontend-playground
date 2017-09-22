(function (THREE) {

  'use strict';


  var isObject = function (test) {
    return test === Object(test) && !Array.isArray(test);
  };

  var checkDefinitionIsObject = function (test) {
    if (!isObject(test)) {
      throw new CompilationException("Definition (or part of a defintion) is not an object: " + test);
    }
  };

  var copyObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  var copyObjectFields = function (sourceObject, targetObject, fieldsToIgnore) {
    for (var key in sourceObject) {
      if (Array.isArray(fieldsToIgnore) && fieldsToIgnore.indexOf(key) !== -1) {
        continue;
      }
      targetObject[key] = sourceObject[key];
    }
  };

  var findForName = function(name) {
    // TODO: Search in main definition, too
    var referredDefinition = THREE.Catalogue[name];
    if (referredDefinition === undefined) {
      throw new CompilationException("No object found for reference name '" + name + "'");
    }
    return referredDefinition
  };

  var compileReferenceDefinition = function (definition) {
    var name = definition.name;
    var referredDefinition = findForName(name);
    var referredDefinition = copyObject(referredDefinition);
    copyObjectFields(definition, referredDefinition, ["type", "name"]);
    return compile(referredDefinition);
  };

  var compileRepeatingPart = function (definition) {
    var repeater = definition.repeat;
    delete definition.repeat;
    var partsFromDefinitionRepetition = [];
    for (var j = 0; j < repeater.times; j++) {
      var currentDefinition = copyObject(definition);
      repeater.transform(currentDefinition, j);
      partsFromDefinitionRepetition.push(currentDefinition);
    }
    return {
      "type": "composite",
      "parts": partsFromDefinitionRepetition
    };
  };

  var compileCompositeDefinition = function (definition) {
    if (Array.isArray(definition.parts)) {
      for (var i in definition.parts) {
        var part = definition.parts[i];
        part = compile(part);
        if (isObject(part.repeat)) {
          definition.parts[i] = compileRepeatingPart(part);
        } else {
          definition.parts[i] = part;
        }
      }
    } else {
      delete definition.parts;
    }
    return definition;
  };

  var compile = function (definition) {
    checkDefinitionIsObject(definition);
    if (definition.type === "ref") {
      return compileReferenceDefinition(definition);
    } else if (definition.type === "composite") {
      return compileCompositeDefinition(definition);
    }
    return definition;
  };

  THREE.DefinitionService = {
    findForName: findForName,
    compile: compile
  };

}) (THREE);
