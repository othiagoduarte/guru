(function () {
  'use strict';
  if (!window.sessionStorage.perfil){
      window.location.href = "/auth.html";
  }
  
  var app = angular.module('BlurAdmin.auth', []);

  app.factory('$authInterceptor',AuthInterceptor);
  app.config(routeConfig);

   /** @ngInject */
 function routeConfig($stateProvider) {
   	$stateProvider.state('Auth', {
         url: '/Login',   
         controller: 'authCtrl',              
       });
}

function AuthInterceptor ($window,$q, $injector) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = 'JWT ' + $window.sessionStorage.token;
      return config;
    },

    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        $window.location.href ="/auth.html";
      }
      return $q.reject(response);
    }
  }
}
})();