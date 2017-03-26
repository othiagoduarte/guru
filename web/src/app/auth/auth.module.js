(function () {
  'use strict';

  var app =  angular.module('BlurAdmin.auth', []);
  
  app.factory('$authInterceptor',authInterceptor);
  
 function authInterceptor ($location, $q,$window) {
        
        var interceptor = {
    
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