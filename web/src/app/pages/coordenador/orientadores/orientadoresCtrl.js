(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.orientadores')
    .controller('OrientadoresCtrl', OrientadoresCtrl);
    
 /** @ngInject */
  function OrientadoresCtrl($scope) {
    
    $scope.msg = "Ola coordenador";
  }

})();
