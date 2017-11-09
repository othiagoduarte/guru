(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.coordenador.bancas',[])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('Bancas', {
            url: 'coordenador/bancas',
            title: 'Bancas',
            templateUrl: 'app/pages/coordenador/bancas/bancas.html',
            controller: 'bancasCtrl',
            sidebarMeta: {
              icon: 'ion-search',
              order: 1,
            },        
        });
    }
    
  })();