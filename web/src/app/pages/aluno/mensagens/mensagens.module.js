(function () {
  'use strict';

  angular.module('BlurAdmin.pages.aluno.mensagens',['BlurAdmin.data'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('Mensagens', {
          url: '/aluno/Mensagens',
          title: 'Mensagens',
          templateUrl: 'app/pages/aluno/mensagens/mensagens.html',
          controller: 'mensagensCtrl',
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