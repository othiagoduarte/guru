(function () {
  'use strict';
  angular.module('BlurAdmin.pages.coordenador', modulos());
  
  function modulos(){
      var mod = [];
      
      mod.push('BlurAdmin.pages.agenda');
      mod.push('BlurAdmin.pages.comunicacao');
      mod.push('BlurAdmin.pages.coordenador.orientadores');
      mod.push('BlurAdmin.pages.coordenador.alunos');
      mod.push('BlurAdmin.pages.coordenador.dashboard');
    
      return mod;
  }
})();
