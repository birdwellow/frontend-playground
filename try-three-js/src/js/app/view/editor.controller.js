(function (THREE) {

  'use strict';


  angular.module('Editor').controller('EditorController', [

    '$scope', '$element',

    function ($scope, $element) {

      $scope.definition = THREE.defaultDefinition;

    }
  ]);

})(THREE);
