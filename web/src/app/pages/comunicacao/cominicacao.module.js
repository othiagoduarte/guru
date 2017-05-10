(function () {
  'use strict';

  angular.module('BlurAdmin.pages.comunicacao',['BlurAdmin.pages.aluno.modals'])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('comunicacao', {
          url: '/comunicacao',
          title: 'Comunicação',
          templateUrl: 'app/pages/comunicacao/comunicacao.html',
          controller: 'comunicacaoCtrl',
          sidebarMeta: {
            icon: 'ion-clipboard',
            order: 2,
          }
        });
	}  
})();