(function (THREE) {

  'use strict';


  var isObject = function (test) {
    return test === Object(test) && !Array.isArray(test);
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

  THREE.ObjectUtils = {
    isObject: isObject,
    copyObject: copyObject,
    copyObjectFields: copyObjectFields
  };

}) (THREE);
