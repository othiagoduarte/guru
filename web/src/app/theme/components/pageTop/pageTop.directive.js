/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      controller: pageTopCtrl
    };
  }
  function pageTopCtrl($scope,USERID,$USERDATA){
    $scope.USERID = USERID;
    $scope.perfil = $USERDATA.user.perfil;
    $scope.nomeUsuario = $USERDATA.nome;
  }

})();