(function (L3DEditor) {

  'use strict';


  angular.module('Editor').directive('editor', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/editor.directive.html',
      replace: true,
      controller: function ($scope) {
        // $scope.definition = L3DEditor.Config.defaultDefinition;
        $scope.definition = {
          type: "box",
          dimensions: [10, 10, 10]
        };

        $scope.$watch('definition', function () {
          // console.log('update');
        });


      }
    };

  });



})(L3DEditor || {});
