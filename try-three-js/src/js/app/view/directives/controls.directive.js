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

        $scope.config = L3DEditor.Config;

      }
    };

  });



})(L3DEditor);
