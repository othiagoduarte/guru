(function () {
  'use strict';

  angular.module('BlurAdmin.pages.aluno.orientadores',['BlurAdmin.data'])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('Orientadores', {
          url: '/aluno/orientadores',
          title: 'Buscar Orientadores',
          templateUrl: 'app/pages/aluno/orientadores/orientadores.html',
          controller: 'OrientadoresCtrl',
          sidebarMeta: {
            icon: 'ion-search',
            order: 1,
          }
        });
	}  
})();