L3DEditor = (function (L3DEditor) {

  'use strict';

  /*

  There are three types of definition:

       1. Simple type (box, sphere etc.):
         {
           "type": "box",
           ...
         }

       2. Composite type:
         {
           "type": "composite",
           "parts": [],
           ...
         }

       3. Reference type:
         {
           "type": "ref",
           "name": "...",
           ...
         }

   */



  var checkDefinitionIsObject = function (test) {
    if (!L3DEditor.ObjectUtils.isObject(test)) {
      throw new CompilationException("Definition (or part of a defintion) is not an object: " + test);
    }
  };

  var findForName = function(name) {
    // TODO: Search in main definition, too
    var referredDefinition = L3DEditor.Catalogue[name];
    if (referredDefinition === undefined) {
      throw new CompilationException("No object found for reference name '" + name + "'");
    }
    return referredDefinition
  };

  var compileReferenceDefinition = function (definition) {
    var name = definition.name;
    var referredDefinition = findForName(name);
    var referredDefinition = L3DEditor.ObjectUtils.copyObject(referredDefinition);
    L3DEditor.ObjectUtils.copyObjectFields(definition, referredDefinition, ["type", "name"]);
    return compile(referredDefinition);
  };

  var transformDefinition = function (definition, transformRules, iterationStep) {
    if (!transformRules) {
      console.warn('No transformRules given!');
      return;
    }

    if (!definition.position) {
      definition.position = [0, 0, 0];
    }
    if (transformRules && Array.isArray(transformRules.position) && definition.position.length === transformRules.position.length) {
      for (var i in definition.position) {
        definition.position[i] += iterationStep * transformRules.position[i];
      }
    }

    if (!definition.rotation) {
      definition.rotation = [0, 0, 0];
    }
    if (transformRules && Array.isArray(transformRules.rotation) && definition.rotation.length === transformRules.rotation.length) {
      for (var i in definition.rotation) {
        definition.rotation[i] += iterationStep * transformRules.rotation[i];
      }
    }
  };

  var compileRepeatingPart = function (definition) {
    var repeater = definition.repeat;
    delete definition.repeat;
    var partsFromDefinitionRepetition = [];
    for (var j = 0; j < repeater.times; j++) {
      var currentDefinition = L3DEditor.ObjectUtils.copyObject(definition);
      transformDefinition(currentDefinition, repeater, j);
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
        if (L3DEditor.ObjectUtils.isObject(part.repeat)) {
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

  L3DEditor.DefinitionService = {
    findForName: findForName,
    compile: compile
  };

  return L3DEditor;

}) (L3DEditor || {});