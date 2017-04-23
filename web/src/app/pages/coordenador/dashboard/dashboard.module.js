(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.dashboard',[])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('dashboard', {
          url: '/cordenador/dashboard',
          title: 'Dashboard',
          templateUrl: 'app/pages/coordenador/dashboard/dashboard.html',
          controller: 'dashboardCtrl',
          sidebarMeta: {
            icon: 'ion-clipboard',
            order: 2,
          }
        });
	}  
})();