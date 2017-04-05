(function () {
  'use strict';

  angular.module('BlurAdmin.pages.aluno', [  'BlurAdmin.pages.agenda'
                                            ,'BlurAdmin.pages.aluno.projeto'
                                            ,'BlurAdmin.pages.aluno.orientadores'
                                            ,'BlurAdmin.pages.aluno.modals'
                                            ,'BlurAdmin.pages.aluno.mensagens'
                                            ,'BlurAdmin.pages.aluno.orientacao'
                                          ])
.constant("$ALUNO", JSON.parse(window.sessionStorage.userData));
})();