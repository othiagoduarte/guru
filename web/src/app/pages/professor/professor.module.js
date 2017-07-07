(function () {
  'use strict';
  angular.module('BlurAdmin.pages.professor',modulos() )
  .constant("$PROFESSOR", JSON.parse(window.sessionStorage.userData));

  function modulos(){
      var modulos = [];
      modulos.push('BlurAdmin.pages.agenda');
      modulos.push('BlurAdmin.pages.comunicacao');
      modulos.push('BlurAdmin.pages.professor.mensagens');
      modulos.push('BlurAdmin.pages.professor.orientandos');
      modulos.push('BlurAdmin.pages.professor.orientacao');
      modulos.push('BlurAdmin.pages.professor.feedback');
      return modulos;
  }
})();
