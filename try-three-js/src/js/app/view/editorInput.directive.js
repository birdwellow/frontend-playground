(function (THREE) {

  'use strict';


  angular.module('Editor').directive('editorInput', function () {

    return {
      restrict: 'E',
      template: '<div class="input" contenteditable="true"></div>',
      replace: true,
      scope: {
        value: '='
      },
      link: function (scope, element) {

      }
    };

  });

})(THREE);
