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
      link: function (scope, element) {
        element.find('textarea').bind('keydown keyup', function (event) {
          console.log(event);
        });
      },
      controller: function ($scope, $element) {

        $scope.$on('reformat', function () {
          console.log('reformat');
          $scope.value = format($scope.value);
        });


        // Format JSON while typing
        // TODO: Set the caret to the right position
        // $scope.$watch('value', function () {
        //   $scope.value = format($scope.value);
        // });
      }
    };

  });

})();
