(function () {
  'use strict';

  angular.module('BlurAdmin.pages.aluno', [
                                            ,'BlurAdmin.pages.aluno.projeto'
                                            ,'BlurAdmin.pages.aluno.orientadores'
                                            ,'BlurAdmin.pages.aluno.modals'
                                            ,'BlurAdmin.pages.aluno.mensagens'
                                          ])
.constant("$ALUNO", JSON.parse(window.sessionStorage.userData));
})();