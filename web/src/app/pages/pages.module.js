(function () {
  'use strict';
  var app = angular.module('BlurAdmin.pages',modulos()) .config(routeConfig);
  
  function routeConfig($urlRouterProvider,$httpProvider, baSidebarServiceProvider) {
      $urlRouterProvider.otherwise('/');  
      $httpProvider.interceptors.push('$authInterceptor');
 }

  /** @ngInject */
  function modulos(){
    var mod = [];

    var perfil = sessionStorage.perfil;
    if (perfil == "ALUNO") {
      mod.push('BlurAdmin.pages.aluno');
    }
    
    if (perfil ==  "PROFESSOR") {
      mod.push('BlurAdmin.pages.professor');
    }
    
    if (perfil == "COORDENADOR") {
      mod.push('BlurAdmin.pages.coordenador');
    }
  
    return mod; 
  }
  
})();