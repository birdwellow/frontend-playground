(function (L3DEditor) {

  'use strict';


  var refNames = L3DEditor.DefinitionService.getCatalogDefinitionNames();
  var typeNames = L3DEditor.DefinitionService.getDefinitionTemplateNames();

  var isArrayField = function(field, value) {
    if(field.indexOf('_') !== -1
      || field === 'parts'
      || field === 'points') {
      return false;
    }
    return Array.isArray(value);
  };

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

        $scope.refNames = refNames;
        $scope.typeNames = typeNames;

        $scope.addPart = function () {
          var newPart = L3DEditor.DefinitionService.getDefinitionTemplate('box');
          $scope.model.parts.push(newPart);
        };

        // emitted by child
        $scope.remove = function (part) {
          $scope.$emit('remove-part', part);
        };

        // caught by parent
        $scope.$on('remove-part', function (event, part) {
          if ($scope.model.parts && $scope.model.parts.indexOf(part) !== -1) {
            event.stopPropagation();
            L3DEditor.DefinitionService.backupPart($scope.model, part);
          }
        });

        $scope.restore = function() {
          L3DEditor.DefinitionService.restoreLastPart($scope.model);
        };

        $scope.isArrayField = isArrayField;

      }
    };

  });

})(L3DEditor);
