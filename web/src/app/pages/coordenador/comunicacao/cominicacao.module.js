(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.comunicacao',[])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('comunicacao', {
          url: '/cordenador/comunicacao',
          title: 'Comunicação',
          templateUrl: 'app/pages/coordenador/comunicacao/comunicacao.html',
          controller: 'comunicacaoCtrl',
          sidebarMeta: {
            icon: 'ion-clipboard',
            order: 3,
          }
        });
	}  
})();