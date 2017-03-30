(function () {
  'use strict';

  angular.module('BlurAdmin.pages.aluno.projeto',['BlurAdmin.data.model'])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider,$httpProvider) {

    	$stateProvider.state('Projeto', {
          url: '/aluno/projeto',
          title: 'Meu Projeto',
          templateUrl: 'app/pages/componentes/projeto/projeto.html',
          controller: 'ProjetoCtrl',
          sidebarMeta: {
            icon: 'ion-flag',
            order: 0,
          }
        });
	}  
})();
