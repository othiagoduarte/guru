(function () {
  'use strict';
  if (!window.sessionStorage.perfil){
      window.location.href = "/auth.html";
  }
  
  var app =  angular.module('BlurAdmin.auth', []);
  app.factory('$authInterceptor',authInterceptor);
  app.config(routeConfig);
   /** @ngInject */
  function routeConfig($stateProvider) {
    console.log("Route");
    	$stateProvider.state('Auth', {
          url: '/Login',   
          controller: 'authCtrl',              
        });
	}
 
 function authInterceptor ($location, $q,$window,authorization) {
       
        var interceptor = {
    
        request: function(req){
          req.headers.authorization = authorization.tipo + " " + authorization.token ;
          return req 
        },
        responseError: function(resposta) {
          if (resposta.status == 401) {
              $window.location.href ="/auth.html";
          }
          return $q.reject(resposta);
        }
    }
    
    return interceptor;
    
  }

})();