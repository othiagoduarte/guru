(function () {
'use strict';

var app =  angular.module('BlurAdmin.data', []);

app.service('$apiService',apiService);  

function apiService($http){
    var pUrlApi = "http://localhost:3008/" 
 
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
            return $http.get(pUrlApi + "/ByMatricula/" + pMatricula);
      }
  }
}

function Contato(pUrlApi, $http){
  pUrlApi+= "contato";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
  }
}

function Coordenador(pUrlApi, $http){
  pUrlApi =+"Coordenador";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
  }
}

function Curso(pUrlApi, $http){
  pUrlApi += "Curso";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
  }
}

function Entrega(pUrlApi, $http){
  pUrlApi += "Entrega";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
  }
}

function Feedback(pUrlApi, $http){
  pUrlApi += "Feedback";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
  }
}

function Orientacao(pUrlApi, $http){
  pUrlApi += "Orientacao";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
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
      }
  }
}

function Projeto(pUrlApi, $http){
  pUrlApi += "Projeto";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
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

  }
}

function Skill(pUrlApi, $http){
  pUrlApi+= "Skill";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(pId){
            return $http.get(pUrlApi);            
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
      Get : function(id){
            return $http.get(pUrlApi);            
      },
      Add: function(pData){
            return $http.post(pUrlApi, pData);  
      },
      GetByProfessor : function(pIdProfessor){
            return $http.get(pUrlApi + "/byProfessor/" + pIdProfessor);
      }
  }
}

function Tarefa(pUrlApi, $http){
  pUrlApi+= "solicitacao";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
      },
  }
}

function Usuario(pUrlApi, $http){
  pUrlApi+= "solicitacao";
  return {
      GetAll : function(pData){
            return $http.get(pUrlApi);            
      },
      Get : function(id){
            return $http.get(pUrlApi);            
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

function l_professores(){

  return [
 {nome:"Aline Campos",disponivel:true,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum","Web"]},
 {nome:"Rafael Jeffman",disponivel:false,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum","C++"]},
 {nome:"Luciano Zanus",disponivel:false,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum"]},
 {nome:"Guilherme",disponivel:true,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum"]},
 {nome:"James",disponivel:false,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum"]},
 {nome:"Marcela",disponivel:false,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum","Arduino","IOT"]},
 {nome:"Lossurdo",disponivel:true,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum"]},
 {nome:"Ries",disponivel:false,titulo:"Mestre em Ciencia da Computação",skills: ["Agile","Scrum","Java"]},
 {nome:"Elias Maluco",disponivel:true,titulo:"Mestre em cambiarras",skills: ["Agile","Scrum","XGH"]},
    
  ]
}

function l_alunos(){

  return [
      {nome:"Thiago Duarte",Turma:"TCC1",matricula:"631320232"},
  ];
}
function l_skills(){

  return [
      {nome:"Agile"},
      {nome:"Scrum"},
      {nome:"Android"},
      {nome:"Web"},
      {nome:"Java"},
      {nome:"XGH"},
      {nome:"IOT"},
      {nome:"C++"},
      {nome:"Arduino"},
      {nome:"Extreme Programming"},
      {nome:"NoSQL"},
      {nome:"Firebase"},
      {nome:"Orientação a objetos"},
      {nome:"HTML5"},
      {nome:"CodeIgniter"},
      {nome:"Bootstrap"},
      {nome:"PHP"},
      {nome:"C#"},
      {nome:"MVP"}    
  ]
}
/*
function carregarDados(){

      angular.forEach(l_skills(), function(item) {
      
      $apiService.skill.Add(item).then(
      function(data) {
            console.log(data);
      } , 
      function(error) { 
            console.log("Error:", error);
      });
      
}); 

angular.forEach(l_professores(), function(item) {
      
      $apiService.professor.Save(item).then(
      function(data) {
            console.log(data);
      } , 
      function(error) { 
            console.log("Error:", error);
      });
      
}); 

}

//carregarDados();

*/