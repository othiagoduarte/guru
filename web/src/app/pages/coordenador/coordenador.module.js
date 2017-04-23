(function () {
  'use strict';
  angular.module('BlurAdmin.pages.coordenador', modulos());
  
  function modulos(){
      var mod = [];
      
      mod.push('BlurAdmin.pages.agenda');
      mod.push('BlurAdmin.pages.coordenador.orientadores');
      mod.push('BlurAdmin.pages.coordenador.dashboard');
      mod.push('BlurAdmin.pages.coordenador.comunicacao');
    
      return mod;
  }
})();
