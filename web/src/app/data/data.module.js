(function () {
'use strict';

var app =  angular.module('BlurAdmin.data', []);

app.directive('fileModel',fileModel);
app.service('$apiService',apiService);  

function fileModel ($parse) {
      return {
            restrict: 'A',
                  link: function(scope, element, attrs) {
                        
                        var model = $parse(attrs.fileModel);
                        var modelSetter = model.assign;
                        
                        element.bind('change', function(){
                              scope.$apply(function(){
                              modelSetter(scope, element[0].files[0]);
                              });
                        });
                  }
            };
 }

function apiService($http,$URLAPI,FileUploader,$httpParamSerializer){

    var pUrlApi = $URLAPI;
 
    this.aluno = Aluno(pUrlApi, $http);    
    this.contato = Contato(pUrlApi, $http);    
    this.coordenador = Coordenador(pUrlApi, $http);    
    this.curso = Curso(pUrlApi, $http);    
    this.entrega = Entrega(pUrlApi, $http);    
    this.feedback = Feedback(pUrlApi, $http);    
    this.orientacao = Orientacao(pUrlApi, $http);
    this.professor = Professor(pUrlApi, $http);
    this.projeto = Projeto(pUrlApi, $http);
    this.solicitacao = Solicitacao(pUrlApi, $http);
    this.tarefa = Tarefa(pUrlApi, $http);
    this.usuario = Usuario(pUrlApi, $http);
    this.skill = Skill(pUrlApi, $http);
    this.arquivo = Arquivo(pUrlApi,$http);
    this.comunicado = Comunicado(pUrlApi,$http);
}

function Arquivo(pUrlApi,$http){
         pUrlApi += "arquivo/";
    
    return {
            entregarEtapa : function(pFile, pData){
                  
                  
                  var form = new FormData();

                  form.append('file', pFile, pData.etapa.titulo + ".zip" );
                  form.append('projeto', pData.projeto._id);
                  form.append('etapa', pData.etapa._id);
                  
                  return $http.post(pUrlApi + "alunos/etapas", form, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                  });
            },
           addComunicado : function(pFile, pData){                 
                  var form = new FormData();
                  form.append('file', pFile);
                  form.append('comunicado', pData.comunicado);
                  
                  return $http.post(pUrlApi + "comunicado/addArquivo", form, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                  });
            }
      }
}

function Aluno(pUrlApi, $http){

  pUrlApi+= "aluno";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      GetByMatricula : function(pMatricula){
            return $http.post(pUrlApi + "/ByMatricula/" + pMatricula,{headers: {'Authorization':'JWT'}});
      },
      GetByUser : function(pUser){
            return $http.get(pUrlApi + "/GetbyUser/" + pUser) ;
      },
      GetByOrientando : function(pIdProfessor){
            return $http.get(pUrlApi + "/ByOrientando/" + pIdProfessor) ;
      },
      add : function(pData){
            return $http.post(pUrlApi, pData);            
      },       
  }
}

function Comunicado(pUrlApi, $http){
  pUrlApi+= "comunicado";
  return {
      GetAll : function(autores){
            return $http.get(pUrlApi, {
                  params:{
                        autores: autores
                  }
            });            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      Add : function (pData){
            return $http.post(pUrlApi, pData);              
      },
      Save : function (pData){
            return $http.put(pUrlApi, pData);             
      },
      Delete : function (pId){
            return $http.delete(pUrlApi + "/" + pId);            
      }            
  }
}
function Contato(pUrlApi, $http){
  pUrlApi+= "contato";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

function Coordenador(pUrlApi, $http){
  pUrlApi =+"Coordenador";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

function Curso(pUrlApi, $http){
  pUrlApi += "Curso";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

function Entrega(pUrlApi, $http){
  pUrlApi += "Entrega";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

function Feedback(pUrlApi, $http){
  pUrlApi += "Feedback";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

function Orientacao(pUrlApi, $http){
  pUrlApi += "Orientacao";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      Add: function(pData){
            return $http.post(pUrlApi, pData);  
      },
      Save: function(pData){
            return $http.put(pUrlApi, pData);  
      },
      GetByProfessor : function(pIdProfessor){
            return $http.get(pUrlApi + "/byProfessor/" + pIdProfessor);
      },
      GetByAluno : function(pIdAluno){
            return $http.get(pUrlApi + "/byAluno/" + pIdAluno);
      }   

  }
}

function Professor(pUrlApi, $http){
  pUrlApi += "Professor";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      Add: function(pData){
            return $http.post(pUrlApi, pData);  
      },
      Save: function(pData){
            return $http.put(pUrlApi, pData);  
      },
      GetByUser : function(pUser){
            return $http.get(pUrlApi + "/GetbyUser/" + pUser) ;
      }
  }
}

function Projeto(pUrlApi, $http){
  pUrlApi += "Projeto";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      Add: function(pData){
            return $http.post(pUrlApi, pData);  
      },
      Save: function(pData){
            return $http.put(pUrlApi, pData);  
      },
      GetByAluno: function(pMatricula){
            return $http.get(pUrlApi + "/GetByAluno/" + pMatricula);  
      },
      AddEtapa: function(pData){
            return $http.put(pUrlApi + "/addEtapa", pData);
      },
      EditarEtapa: function(pData){
            return $http.post(pUrlApi + "/editarEtapa", pData);
      },
      EnviarFeedback: function(pData){
            return $http.post(pUrlApi + "/enviarFeedback", pData);
      },

      DelEtapa: function(pData){
            return $http.post(pUrlApi + "/delEtapa", pData);
      },   
      GetFeedbacks :  function (pId){
            return $http.get(pUrlApi + "/feedbacks/" + pId);  
      }       
  }
}

function Skill(pUrlApi, $http){
  pUrlApi+= "Skill";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      Add: function(pData){
            return $http.post(pUrlApi, pData);  
      }
  }
}

function Solicitacao(pUrlApi, $http){
  pUrlApi+= "solicitacao";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
      Add: function(pData){
            return $http.post(pUrlApi, pData);  
      },
      Save: function(pData){
            return $http.put(pUrlApi, pData);  
      },
      
      GetByProfessor : function(pIdProfessor){
            return $http.get(pUrlApi + "/byProfessor/" + pIdProfessor);
      },
      GetByAluno : function(pIdAluno){
            return $http.get(pUrlApi + "/byAluno/" + pIdAluno);
      }      
  }
}

function Tarefa(pUrlApi, $http){
  pUrlApi+= "Tarefa";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

function Usuario(pUrlApi, $http){
  pUrlApi+= "Usuario";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi + "/" + pId);            
      },
  }
}

app.service('$validarService',validarService);
 
function validarService(){
    var retorno = {valido:false,mensagem:"inválido: "};

    this.aluno = function(pData){
      return retorno;
    }  

    this.contato =  function(pData){
          return retorno;
    }

    this.coordenador =  function(pData){
          return retorno;
    }

    this.curso =  function(pData){
          return retorno;
    }

    this.entrega =  function(pData){
          return retorno;
    }

    this.feedback =  function(pData){
          return retorno;
    }

    this.orientacao =  function(pData){
          return retorno;
    }

    this.professor =  function(pData){
          return retorno;
    }

    this.projeto =  function(pData){
          return retorno;
    }

    this.solicitacao =  function(pData){
      if(!pData.titulo){
            retorno.mensagem = "Título é uma informação obrigatoria";
            retorno.valido = false;
            return retorno;
      }
      
      if(!pData.resumo){
            retorno.mensagem = "Resumo é uma informação obrigatoria";
            retorno.valido = false;
            return retorno;
      }

      if(pData.resumo.split(" ").length < 10){
            retorno.mensagem = "Descreva mais o resumo. Mínimo 10 palavras";
            retorno.valido = false;
            return retorno;            
      }
      
      return {valido:true} 
    }

    this.tarefa =  function(pData){
          return retorno;
    }

    this.usuario =  function(pData){
          return retorno;
    }

    this.skill =  function(pData){
          return retorno;
    }    
}

})();
