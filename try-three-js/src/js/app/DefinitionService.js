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

  var copyObjectFields = function(sourceObject, targetObject, fieldsToSkip) {
    for (var key in sourceObject) {
      if(Array.isArray(fieldsToSkip) && fieldsToSkip.indexOf(key) === -1) {
        var value = sourceObject[key];
        targetObject[key] = value;
      }
    }
  };

  var findForName = function(name) {
    return THREE.Catalogue[name];
  };

  var compileReferenceDefinition = function (definition) {
    var name = definition.name;
    var referredDefinition = findForName(name);
    if (!referredDefinition) {
      throw new CompilationException("No object found for reference name '" + name + "'");
    }
    // var referredDefinitionCopy = Object.create(referredDefinition);
    // return compile(referredDefinitionCopy);
    return compile(referredDefinition);
  };

  var compileCompositeDefinition = function (definition) {
    if (Array.isArray(definition.definitions)) {
      for (var i in definition.definitions) {
        var subDefinition = definition.definitions[i];
        definition.definitions[i] = compile(subDefinition);
      }
    } else {
      // Make sure wrong config won't mess up the rendering
      delete definition.definitions;
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
