(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.projeto')
.controller('ProjetoCtrl', ProjetoCtrl);

    /** @ngInject */
    function ProjetoCtrl($scope,$apiService,$modalservice,$window,$ALUNO,$timeout,$uibModal) {

        $scope.data = {};
        $scope.data.aluno = $ALUNO;
        $scope.data.isAluno = true;
        $scope.data.projeto = null;
        $scope.salvarProjeto = salvarProjeto;
        $scope.criarEtapa = criarEtapa; 
        $scope.excluirEtapa = excluirEtapa;
        $scope.editarEtapa = editarEtapa;
        $scope.addTarefa = addTarefa;
        $scope.addToDoItem = addToDoItem; 
        $scope.concluirEtapa = concluirEtapa;
        $scope.entregarEtapa = entregarEtapa;
        $scope.todoList = [];
        
        $scope.data.listSegmento = [
            {descricao:"Mobile",value:1}
            ,{descricao:"Web",value:2}
            ,{descricao:"Desktop",value:3}
            ,{descricao:"Mineração de Dados",value:4}
            ,{descricao:"Gerência/Infra Redes",value:5}
            ,{descricao:"Testes",value:6}
        ];

        $apiService.projeto.GetByAluno($scope.data.aluno.matricula)
        .then(function(projeto){
            $scope.data.projeto = {};
            if(projeto.data){
                $scope.data.projeto = projeto.data;
                $scope.data.isAluno = true;
            }
            else{
                $scope.data.projeto.aluno = $scope.data.aluno;
                $apiService.projeto.Add($scope.data.projeto);
            }
        });
            
        function concluirEtapa(pDados,projeto){
            pDados.concluido = (pDados.concluido == false);
            editarEtapaCtrl({projeto:projeto,etapa:pDados});
        }    
        
        function salvarProjeto(){
            $apiService.projeto.Save($scope.data.projeto)
            .then(function(projeto){
                $modalservice.informacao({titulo:"Sucesso",mensagem:"Sucesso ao savlar o projeto"});
            });
        }

        function criarEtapa(pDados){
            var _etapa = {titulo :"ETAPA #" + (pDados.etapas.length + 1)};
            $modalservice.executar({
                func:criarEtapaCtrl,
                data:{projeto:pDados, etapa: _etapa},
                size:'lg',
                template:'app/pages/componentes/projeto/etapas/etapa.html'
            });
        }

        function criarEtapaCtrl(pDados,fecharModal){

            var _dados = { projeto: pDados, etapa:pDados.etapa };
            
            $apiService.projeto.AddEtapa(_dados)
            .then(function(projeto){
            
                $scope.data.projeto = {};
                
                $timeout(function(){
                    $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao criar etapa"});
                    fecharModal();

                    $scope.$apply(function(){
                        $scope.data.projeto = projeto.data ;                    
                    });
                });            
            })
            .catch(function(data) {
                var retorno = {};
                retorno.titulo = "Atenção";
                retorno.mensagem = "Não foi criar etapa!";
                $modalservice.atencao(retorno);
                fecharModal();
             });
        }

        function editarEtapa(pDados,projeto){    
            pDados.projeto = { _id: projeto._id};
            $modalservice.executar({
                func:editarEtapaCtrl,
                data:{etapa:pDados,projeto: pDados.projeto },
                size:'lg',
                template:'app/pages/componentes/projeto/etapas/etapa.html'
            });
        } 

        function editarEtapaCtrl(pDados,fecharModal){
            $apiService.projeto.EditarEtapa(pDados)
            .then(function(projeto){
            
                $scope.data.projeto = {};
                
                $timeout(function(){
                    $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao salvar os dados da etapa"});
                    if(fecharModal){
                        fecharModal();
                    }

                    $scope.$apply(function(){
                        $scope.data.projeto = projeto.data ;                    
                    });
                });            
            })
            .catch(function(data) {
                var retorno = {};
                retorno.titulo = "Atenção";
                retorno.mensagem = "Não foi editar etapa!";
                fecharModal();
                $modalservice.atencao(retorno);
             });
        } 

        function excluirEtapa(pDados,projeto){

            var _retorno = {titulo:"Excluir Etapa ", mensagem:"Deseja excluir a etapa " + pDados.titulo};
            pDados.projeto = { _id: projeto._id};
            
            $modalservice.executar({
                func:excluirEtapaCtrl,
                data:{retorno:_retorno,etapa:pDados,projeto: pDados.projeto},
                size:'sm',
                template:'app/pages/modals/template/processar.html'
            });
        } 

        function excluirEtapaCtrl(pDados,fecharModal){

            $apiService.projeto.DelEtapa({ projeto: pDados.projeto, etapa:pDados.etapa })
            .then(function(projeto){
                $scope.data.projeto = {};
                $timeout(function(){
                    $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao excluir etapa"});
                    fecharModal();
                    $scope.$apply(function(){
                        $scope.data.projeto = projeto.data ;                    
                    });
                });            
            })
            .catch(function(data) {
                    var retorno = {};
                    retorno.titulo = "Atenção";
                    retorno.mensagem = "Não foi possivel excluir etapa!" + data.data.retorno;
                    $modalservice.atencao(retorno);
                    fecharModal();
             });
        } 
        
        function entregarEtapa(pDados,projeto){

            pDados.projeto = projeto;

            $modalservice.executar({
                func:entregarEtapaCtrl,
                data:{etapa:pDados,projeto: pDados.projeto},
                size:'md',
                template:'app/pages/componentes/upload/upload.html'
            });
        } 

        function entregarEtapaCtrl(pDados,fecharModal){
            var data = this.data;
            var file = this.myFile;
            $apiService.arquivo.entregarEtapa( file , data)
            .then(function(projeto){
                $scope.data.projeto = {};
                $timeout(function(){
                    $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao entregar etapa!"});
                    fecharModal();
                    $scope.$apply(function(){
                        $scope.data.projeto = projeto.data ;                    
                    });
                });                  
                fecharModal();
            })
            .catch(function(data) {
                    var retorno = {};
                    retorno.titulo = "Atenção";
                    retorno.mensagem = "Não foi possivel enviar arquivo!" + data.data.mensagem;
                    $modalservice.atencao(retorno);
                    fecharModal();
             });
        } 
        
        function addTarefa(pDados,projeto){

            pDados.projeto = { _id: projeto._id};
            
            $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/componentes/projeto/etapas/tarefas.html',
                size: 'lg',
                controller: addTarefaCtrl,
                resolve: {
                    param: pDados,
                }
            });
        } 
        
        function addTarefaCtrl($scope,param){

            $scope.etapa  = param;
            $scope.todoList = param.tarefas;
            $scope.addToDoItem = addToDoItem;
            $scope.salvarTarefasEtapa =salvarTarefasEtapa
                        
            function salvarTarefasEtapa (fechar){
                $scope.etapa.tarefas = $scope.todoList;

                $apiService.projeto.EditarEtapa({projeto:$scope.etapa.projeto , etapa: $scope.etapa })
                .then(function(projeto){
                    $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao salvar etapa"});
                    fechar();
                })
                .catch(function(data) {
                    var retorno = {};
                    retorno.titulo = "Atenção";
                    retorno.mensagem = "Não foi adicionar tarefa!";
                    $modalservice.atencao(retorno);
                    fecharModal();
             });
            }
        }

        function addToDoItem (event, clickPlus,param) {
            var $scope = this;
            if (clickPlus || event.which === 13) {
                $scope.todoList.push({
                    descricao: $scope.newTodoText,
                    color:'#209e91',
                    concluida : false,
                });
                $scope.newTodoText = '';
            }
        }
    }
})();
