(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.orientadores',[])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('Orientadores', {
          url: 'coordenador/orientadores',
          title: 'Orientadores',
          templateUrl: 'app/pages/coordenador/orientadores/orientadores.html',
          controller: 'OrientadoresCtrl',
          sidebarMeta: {
            icon: 'ion-search',
            order: 3,
          },        
      });
  }
  
})();