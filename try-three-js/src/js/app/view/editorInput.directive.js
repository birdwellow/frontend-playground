(function (THREE) {

  'use strict';


  angular.module('Editor').directive('editorInput', function () {

    return {
      restrict: 'E',
      // template: '<textarea class="input" ng-model="value"></textarea>',
      templateUrl: 'html/editorInput.directive.html',
      replace: true,
      scope: {
        value: '='
      }
    };

  });

})(THREE);
