(function () {
'use strict';

var app =  angular.module('BlurAdmin.data.validacao', []);

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