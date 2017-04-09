(function () {
  'use strict';
  angular.module('BlurAdmin.pages.aluno',modulos())
  .constant("$ALUNO", JSON.parse(window.sessionStorage.userData));
   function modulos(){
      var modulos = [];
      modulos.push('BlurAdmin.pages.agenda');
      modulos.push('BlurAdmin.pages.aluno.projeto');
      modulos.push('BlurAdmin.pages.aluno.orientadores');
      modulos.push('BlurAdmin.pages.aluno.modals');
      modulos.push('BlurAdmin.pages.aluno.mensagens');
      modulos.push('BlurAdmin.pages.aluno.orientacao');
      modulos.push('BlurAdmin.pages.aluno.feedback');
      return modulos;
  }
})();