(function () {
  'use strict';

  angular.module('BlurAdmin.pages.aluno.orientacao',['BlurAdmin.data'])
      .config(routeConfig);

  /** @ngInject */

  function routeConfig($stateProvider) {
    $stateProvider
        .state('Orientacao', {
          url: '/aluno/orientacao',
          title: 'Orientações',
          templateUrl: 'app/pages/aluno/orientacao/orientacao.html',
          controller: 'orientacaoCtrl',
          sidebarMeta: {
            icon: 'ion-email',
            order: 5,
          }, 
          data: {
            requireLogin: true // this property will apply to all children of 'app'
          }           
      });
  } 

})();