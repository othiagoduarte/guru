(function () {
  'use strict';

  angular.module('BlurAdmin.pages.professor.agenda',['BlurAdmin.data','BlurAdmin.theme'])
      .config(routeConfig);

   /** @ngInject */
  function routeConfig($stateProvider) {
    	$stateProvider.state('Agenda', {
          url: '/professor/agenda',
          title: 'Agenda',
          templateUrl: 'app/pages/professor/agendas/agenda.html',
          controller: 'AgendaCtrl',
          sidebarMeta: {
            icon: 'ion-search',
            order: 1,
          }        });
	}  
})();