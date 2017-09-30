(function (L3DEditor) {

  'use strict';


  angular.module('Editor').directive('editor', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/editor.directive.html',
      replace: true,
      controller: function ($scope) {
        // $scope.definition = {
        //   type: "box",
        //   dimensions: [10, 10, 10]
        // };
        $scope.definition = L3DEditor.Config.defaultDefinition;

      }
    };

  });



})(L3DEditor || {});
