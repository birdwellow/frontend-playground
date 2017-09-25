(function (THREE) {

  'use strict';


  angular.module('Editor').directive('editorInput', function () {

    return {
      restrict: 'E',
      template: '<textarea class="input" ng-model="value"></textarea>',
      replace: true,
      scope: {
        value: '='
      }
    };

  });

})(THREE);
