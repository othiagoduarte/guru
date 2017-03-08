(function () {
  'use strict';

  angular.module('BlurAdmin.pages.professor.orientandos',['BlurAdmin.data'])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('Orientandos', {
          url: '/professor/orientandos',
          title: 'Meus Orientandos',
          templateUrl: 'app/pages/professor/orientandos/orientandos.html',
          controller: 'OrientandosCtrl',
          sidebarMeta: {
            icon: 'ion-search',
            order: 2,
          }        });
	}  
})();