(function () {

  'use strict';


  angular.module('Editor').directive('jsonInput', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/jsonInput.directive.html',
      replace: true,
      scope: {
        value: '='
      }
    };

  });

})();
