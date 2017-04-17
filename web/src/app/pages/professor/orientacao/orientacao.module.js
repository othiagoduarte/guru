(function () {
  'use strict';

  angular.module('BlurAdmin.pages.professor.orientacao',['BlurAdmin.data'])
      .config(routeConfig);

  /** @ngInject */

  function routeConfig($stateProvider) {
    $stateProvider
        .state('Orientacao', {
          url: '/professor/orientacao',
          title: 'Orientações',
          templateUrl: 'app/pages/professor/orientacao/orientacao.html',
          controller: 'orientacaoCtrl',
          sidebarMeta: {
            icon: 'ion-email',
            order: 2,
          }, 
          data: {
            requireLogin: true // this property will apply to all children of 'app'
          }           
      });
  } 

})();