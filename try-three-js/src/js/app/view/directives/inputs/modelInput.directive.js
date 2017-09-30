(function () {

  'use strict';


  angular.module('Editor').directive('modelInput', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/inputs/modelInput.directive.html',
      replace: true,
      scope: {
        model: '='
      }
    };

  });

})();
