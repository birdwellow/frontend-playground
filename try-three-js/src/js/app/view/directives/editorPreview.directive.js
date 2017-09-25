(function (THREE) {

  'use strict';


  angular.module('Editor').directive('editorPreview', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/editorPreview.directive.html',
      replace: true,
      scope: {
        model: '='
      },
      link: function (scope, element) {

        var nativeElement = angular.element(element)[0];
        var room = new THREE.Room(nativeElement, JSON.parse(scope.model));

        scope.$watch('model', function () {
          room.update(JSON.parse(scope.model));
        });
      }
    };

  });

})(THREE);
