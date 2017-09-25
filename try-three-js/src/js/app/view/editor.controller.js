(function (THREE) {

  'use strict';


  angular.module('Editor').controller('EditorController', [

    '$scope', '$element',

    function ($scope, $element) {

      $scope.definition = JSON.stringify(THREE.defaultDefinition, null, 4);

    }
  ]);

})(THREE);
