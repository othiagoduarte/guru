(function () {
  'use strict';
  var app = angular.module('BlurAdmin.pages',modulos()) .config(routeConfig);
  
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
      $urlRouterProvider.otherwise('/agenda');  
  }
  /** @ngInject */
  function modulos($routeProvider){
    var mod = [];
    var perfil = "";
    /*perfil = "COORDENADOR";*/
    //perfil = "ALUNO";
    perfil = "PROFESSOR";
    
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