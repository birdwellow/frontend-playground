(function (THREE) {

  'use strict';


  angular.module('Editor').directive('editor', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/editor.directive.html',
      replace: true,
      controller: function ($scope) {
        $scope.definition = JSON.stringify(THREE.defaultDefinition, null, 4);
      }
    };

  });



})(THREE);
