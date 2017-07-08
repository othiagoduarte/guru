(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.alunos',[])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('Alunos', {
          url: 'coordenador/alunos',
          title: 'Alunos',
          templateUrl: 'app/pages/coordenador/alunos/alunos.html',
          controller: 'alunosCtrl',
          sidebarMeta: {
            icon: 'ion-search',
            order: 4,
          },        
      });
  }
  
})();