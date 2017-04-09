(function () {
  'use strict';

  angular.module('BlurAdmin.pages.professor.feedback',['BlurAdmin.data'])
      .config(routeConfig);

  /** @ngInject */

  function routeConfig($stateProvider) {
    $stateProvider
        .state('Feedback', {
          url: '/professor/feedback',
          title: 'Feedback',
          templateUrl: 'app/pages/professor/feedback/feedback.html',
          controller: 'feedbackCtrl',
          sidebarMeta: {
            icon: 'ion-checkmark-round',
            order: 6,
          }, 
          data: {
            requireLogin: true // this property will apply to all children of 'app'
          }           
      });
  } 

})();