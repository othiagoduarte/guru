(function () {
  'use strict';

  angular.module('BlurAdmin.pages.agenda',['BlurAdmin.data'])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('Agenda', {
          url: '/dasboard/agenda',
          title: 'Agenda',
          templateUrl: 'app/pages/agendas/agenda.html',
          controller: 'AgendaCtrl',
          sidebarMeta: {
            icon: 'ion-search',
            order: 0,
          }        });
	}  
})();