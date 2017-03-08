(function () {
    'use strict';
    
    var app =  angular.module('BlurAdmin.data.model', []);

    app.service('$model',$model);

    function $model($bdfirebase,$apiService){ 
        
        this.Solicitacao = Solicitacao;
        this.Professor = Professor;
        this.Aluno = Aluno;
        this.Skill = Skill; 
        this.Usuario = Usuario;
        this.Projeto = Projeto;
        this.Contato = Contato;

        function Contato(){
           Contato.prototype.GetAll =  function  (){
                return $apiService.contatos.GetAll();
            }
        }
        
        function Model($url){
            
            var url = $url;
            
            Model.prototype.Add = function(){
                return $bdfirebase.Add(url,this).$loaded();
            }

            Model.prototype.Save = function(){
                return $bdfirebase.Save(url,this).$loaded();
            }
            
            Model.prototype.GetById = function(id){
                return $bdfirebase.Get(url+"/"+id).$loaded();
            }       
            
            Model.prototype.GetAll = function(){
                return $bdfirebase.GetAll(url).$loaded();
            }
        }
        
        function Solicitacao(obj){
            var url = "solicitacoes";
            
            this.id = "";
            this.aluno = new Aluno();
            this.professor = new Professor();
            this.status = {cod:"E",descricao:"Enviado"};
            this.titulo = "";
            this.resumo = "";
            this.resposta = "";
            this.envio = Date.now();
            
            if (obj){
                
                this.id = obj.$id;;
                this.aluno = obj.aluno;
                this.professor = obj.professor;
                this.status = obj.status;
                this.titulo = obj.titulo;
                this.resumo = obj.resumo;
                this.envio = obj.envio;
                this.resposta = obj.resposta;
            }   

            Solicitacao.prototype.validar = function(){ 
                
                var retorno = {};

                if (this.titulo.trim() === "") {
                    retorno.sucesso = false;
                    retorno.retorno = "O título é uma informação obrigatória";
                    return  retorno;    
                }

                if (this.resumo.trim() === "") {
                    retorno.sucesso = false;
                    retorno.retorno = "O resumo é uma informação obrigatória";
                    return  retorno;
                }
              
                retorno.sucesso = true
                retorno.retorno = "Sucesso ao validar";
                return  retorno;
            }
            
            Solicitacao.prototype.GetSolicitacoesByProfessor = function(_id, list){
                
                var TodasSolicitacoes = $bdfirebase.GetAll("solicitacoes");//100
                
                //angular.filter();


                TodasSolicitacoes.$loaded(function() {
                    angular.forEach(TodasSolicitacoes, function(item) {
                        if (item.professor.id == _id) {
                            list.push(item);                                                
                        }
                    });
                    return list;
                });
            }
            
            Solicitacao.prototype.Add = function (){
                return $bdfirebase.Add(url,this);
            }
            
            Solicitacao.prototype.GetAll = function(){
                return $bdfirebase.GetAll(url);
            }
            
            Solicitacao.prototype.GetById = function(id){
                return $bdfirebase.Get(url+"/"+id);
            }

            Solicitacao.prototype.Save = function(){
                
                var ref = url+"/"+this.id;
                var obj = $bdfirebase.Get(ref);
            
                obj.aluno = this.aluno ;
                obj.professor = this.professor;
                obj.status = this.status;
                obj.titulo = this.titulo;
                obj.resumo = this.resumo;
                obj.resposta = this.resposta;
                obj.dataResposta = Date.now();
                obj.envio = this.envio;

                return $bdfirebase.Save(obj);            
                
            } 
        }
        
        function Usuario(){
            /*PROFESSORA ALINE */
           this.id = "-KSjD2L9MLC9u-p9RvqW";
           this.Tipo = "PROFESSOR";
        }

        function Professor(){ 
           var url = "professores";
           this.Nome = "";
           this.Skill = [];      

            Professor.prototype.GetAll = function(){
                return $bdfirebase.GetAll(url).$loaded();
            } 
            
            Professor.prototype.GetById = function(id){
                return $bdfirebase.Get(url+"/"+id).$loaded();
            }        
        }

        function Aluno(){
            var url = "alunos";
            
            this.id = "";
            this.nome = "";
            this.curso = "";
            this.apresentacao = "";
            this.matricula = "";
            
            Aluno.prototype.Add = function(){
                return $bdfirebase.Add(url,this).$loaded();
            }

            Aluno.prototype.Save = function(){
                return $bdfirebase.Save(url,this).$loaded();
            }
            
            Aluno.prototype.GetById = function(id){
                return $bdfirebase.Get(url+"/"+id).$loaded();
            }       
            
            Aluno.prototype.GetAll = function(){
                return $bdfirebase.GetAll(url).$loaded();
            }
        }
        
        function Skill(){
            var url = "skills";
                        
            Skill.prototype.Add = function(){
                return $bdfirebase.Add(url,this).$loaded();
            }

            Skill.prototype.Save = function(){
                return $bdfirebase.Save(url,this).$loaded();
            }
            
            Skill.prototype.GetById = function(id){
                return $bdfirebase.Get(url+"/"+id).$loaded();
            }       
            
            Skill.prototype.GetAll = function(){
                return $bdfirebase.GetAll(url).$loaded();
            }
                  
        }

        function  Projeto($proj){
            var url = "projetos";
            
            this.aluno = new Aluno();
            this.professor = new Professor();
            this.titulo = "";
            this.problema = "";
            this.solucao = "";
            this.resumo = "";
            this.envio = Date.now();
            this.segmento = {};
            if($proj){
                this.id = $proj.$id;
                this.aluno =$proj.aluno;
                this.professor = $proj.professor;
                this.titulo =  $proj.titulo;
                this.problema = $proj.problema;
                this.solucao = $proj.solucao;
                this.resumo = $proj.resumo;
                this.envio = $proj.envio;
                this.segmento = $proj.segmento;
            }

            Projeto.prototype.Add = function(){
                return $bdfirebase.Add(url,this);
            }

            Projeto.prototype.Save = function(){
                
                var ref = url+"/"+this.id;
                var obj = $bdfirebase.Get(ref);
                
                obj.aluno = this.aluno ;
                obj.professor = this.professor;
                obj.titulo = this.titulo;
                obj.problema = this.problema;
                obj.solucao = this.solucao 
                obj.resumo = this.resumo;
                obj.envio = this.envio;
                obj.segmento = this.segmento;
                return $bdfirebase.Save(obj);  
            }
            
            Projeto.prototype.GetById = function(id){
                return $bdfirebase.Get(url+"/"+id).$loaded();
            }       
            
            Projeto.prototype.GetAll = function(){
                return $bdfirebase.GetAll(url).$loaded();
            }

            Projeto.prototype.Validar = function(){
                
                var retorno = {};

                if (true) {
                    retorno.sucesso = false;
                    retorno.retorno = "Já existe um projeto para o aluno";
                    return  retorno;    
                }
            }
            
            Projeto.prototype.GetByAluno  = function ($aluno){
                var projeto = null;
                var TodasSolicitacoes = $bdfirebase.GetAll("projetos");
                var result = Q(initialVal);
                
                TodasSolicitacoes.$loaded(function(data){
                    angular.forEach(function(item){
                        
                        console.log(item.aluno);

                    });
                });
                
                return TodasSolicitacoes.$loaded();
            }     
            
        }    
    }
})();