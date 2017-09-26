(function (L3DEditor) {

  'use strict';


  angular.module('Editor').directive('preview', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/preview.directive.html',
      replace: true,
      scope: {
        definition: '=',
        error: '=',
      },
      link: function (scope, element) {

        var nativeElement = angular.element(element)[0];
        var room = new L3DEditor.Room(nativeElement, JSON.parse(scope.definition));

        scope.$watch('definition', function () {

          try {
            room.update(JSON.parse(scope.definition));
            scope.error = false;
          } catch (e) {
            console.log(e.message);
            scope.error = true;
          }

        });
      }
    };

  });

})(L3DEditor);
