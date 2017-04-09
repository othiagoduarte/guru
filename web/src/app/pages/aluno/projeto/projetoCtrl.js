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
            template:'app/pages/componentes/projeto/etapas/enviar-etapa.html'
        });
    }

    function criarEtapaCtrl(pDados,fecharModal){

        var _dados = { projeto: pDados, etapa:pDados.etapa };
        
        $apiService.projeto.AddEtapa(_dados)
        .then(function(projeto){
           
            $scope.data.projeto = {};
            
            $timeout(function(){
                $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao salvar etapa"});
                fecharModal();

                $scope.$apply(function(){
                    $scope.data.projeto = projeto.data ;                    
                });
           });            
        });
    }

    function editarEtapa(pDados){
        $modalservice.executar({
            func:editarEtapaCtrl,
            data:{etapa:pDados},
            size:'lg',
            template:'app/pages/componentes/projeto/etapas/enviar-etapa.html'
        });
    } 

    function editarEtapaCtrl(pDados,fecharModal){

        var _dados = { projeto: pDados, etapa:pDados.etapa };
        
        $apiService.projeto.AddEtapa(_dados)
        .then(function(projeto){
           
            $scope.data.projeto = {};
            
            $timeout(function(){
                $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao salvar etapa"});
                fecharModal();

                $scope.$apply(function(){
                    $scope.data.projeto = projeto.data ;                    
                });
           });            
        });
    } 

    function excluirEtapa(pDados){
        $modalservice.executar({
            func:excluirEtapaCtrl,
            data:{projeto:pDados},
            size:'lg',
            template:'app/pages/componentes/projeto/etapas/enviar-etapa.html'
        });
    } 

    function excluirEtapaCtrl(pDados,fecharModal){

        var _dados = { projeto: pDados, etapa:pDados.etapa };
        
        $apiService.projeto.AddEtapa(_dados)
        .then(function(projeto){
           
            $scope.data.projeto = {};
            
            $timeout(function(){
                $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao salvar etapa"});
                fecharModal();

                $scope.$apply(function(){
                    $scope.data.projeto = projeto.data ;                    
                });
           });            
        });
    } 
    
    function addTarefa(pDados,projeto){

        pDados.projeto = { _id: projeto._id};
        
        $uibModal.open({
            animation: true,
            templateUrl: 'app/pages/componentes/projeto/etapas/tarefas.html',
            size: 'lg',
            controller: executarTarefaCtrl,
            resolve: {
                param: pDados,
            }
        });
    } 
    function executarTarefaCtrl($scope,param){

        $scope.etapa  = param;
        $scope.todoList = param.tarefas;
        $scope.addToDoItem = addToDoItem;
        $scope.salvarTarefasEtapa = function (fechar){
                
                $scope.etapa.tarefas = $scope.todoList;

                $apiService.projeto.EditarEtapa({projeto:$scope.etapa.projeto , etapa: $scope.etapa })
                .then(function(etapa){
                    console.log(etapa);
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
