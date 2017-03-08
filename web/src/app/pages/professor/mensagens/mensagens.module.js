(function () {
  'use strict';

  angular.module('BlurAdmin.pages.professor.mensagens',['BlurAdmin.data','BlurAdmin.pages.aluno.modals'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('Mensagens', {
          url: '/professor/Mensagens',
          title: 'Mensagens',
          templateUrl: 'app/pages/professor/mensagens/mensagens.html',
          controller: 'mensagensCtrl',
          sidebarMeta: {
            icon: 'ion-email',
            order: 3,
          },        
      });
  }  
})();