(function (L3DEditor) {

  'use strict';


  angular.module('Editor').directive('modelInput', function () {

    return {
      restrict: 'E',
      templateUrl: 'js/app/view/directives/inputs/modelInput.directive.html',
      replace: true,
      scope: {
        model: '=',
        exchange: '='
      },
      controller: function ($scope) {

        $scope.refNames = L3DEditor.DefinitionService.getCatalogDefinitionNames;
        $scope.typeNames = L3DEditor.DefinitionService.getDefinitionTemplateNames;

        $scope.addPart = function () {
          var newPart = L3DEditor.DefinitionService.getDefinitionTemplate('box');
          $scope.model.parts.push(newPart);
        };

      }
    };

  });

})(L3DEditor);
