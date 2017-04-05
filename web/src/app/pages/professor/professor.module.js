(function () {
  'use strict';

  angular.module('BlurAdmin.pages.professor',modulos() )
  .constant("$PROFESSOR", JSON.parse(window.sessionStorage.userData));

  function modulos(){
      var modulos = [];
      modulos.push('BlurAdmin.pages.agenda');
      modulos.push('BlurAdmin.pages.professor.mensagens');
      modulos.push('BlurAdmin.pages.professor.orientandos');
      modulos.push('BlurAdmin.pages.professor.orientacao');
      return modulos;
  }
})();
