(function () {

  'use strict';


  angular.module('Editor').directive('jsonInput', function () {

    var format = function (jsonString) {
      return JSON.stringify(JSON.parse(jsonString), null, 4);
    };

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/jsonInput.directive.html',
      replace: true,
      scope: {
        value: '='
      },
      controller: function ($scope, $rootScope) {

        $scope.$on('reformat', function () {
          $scope.value = format($scope.value);
        });

        // $scope.$watch('value', function () {
        //   $scope.value = format($scope.value);
        // });
      }
    };

  });

})();
