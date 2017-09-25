(function () {

  'use strict';


  angular.module('Editor').directive('editorInput', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/editorInput.directive.html',
      replace: true,
      scope: {
        value: '='
      }
    };

  });

})();
