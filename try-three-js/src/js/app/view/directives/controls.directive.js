(function (L3DEditor) {

  'use strict';


  angular.module('Editor').directive('controls', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/controls.directive.html',
      replace: true,
      scope: {
        error: '='
      },
      controller: function ($scope, $rootScope) {

        // TODO: Add UI-trigger for auto-format
        // TODO: Add buttons to insert definitions

        $scope.config = L3DEditor.Config;

        $scope.format = function () {
          $rootScope.$broadcast('reformat');
        };
      }
    };

  });



})(L3DEditor);
