(function (THREE) {

  'use strict';


  angular.module('Editor').directive('editorPreview', function () {

    return {
      restrict: 'E',
      template: '<div class="editor preview"></div>',
      replace: true,
      scope: {
        model: '='
      },
      link: function (scope, element) {
        var nativeElement = angular.element(element)[0];
        new THREE.Room(nativeElement, scope.model);
      }
    };

  });

})(THREE);
