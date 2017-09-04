(function () {
  'use strict';
  var app = angular.module('BlurAdmin.pages',modulos()) 
  .config(routeConfig);

  function routeConfig($urlRouterProvider,$httpProvider) {
      $urlRouterProvider.otherwise('/');  
      $httpProvider.defaults.headers.common['authorization'] = 'JWT ' + window.sessionStorage.token;
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