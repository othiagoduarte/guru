/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.componentes.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'app/pages/compomemtes/profile/profile.html',
          controller: 'profileCtrl',
        });
  }

})();
