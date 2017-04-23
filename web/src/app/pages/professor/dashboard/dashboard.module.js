(function () {
  'use strict';

  angular.module('BlurAdmin.pages.orientador.dashboard',[])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('dashboard', {
          url: '/orientador/dashboard',
          title: 'Dashboard',
          templateUrl: 'app/pages/orientador/dashboard/dashboard.html',
          controller: 'dashboardCtrl',
          sidebarMeta: {
            icon: 'ion-clipboard',
            order: 2,
          }
        });
	}  
})();