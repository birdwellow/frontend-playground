(function () {

  'use strict';


  angular.module('Editor').directive('domInput', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/domInput.directive.html',
      replace: true,
      scope: {
        model: '='
      },
      link: function (scope, element) {
      }
    };

  });

})();
