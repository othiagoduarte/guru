(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.projeto')

	.controller('ProjetoCtrl', ProjetoCtrl);
    
    /** @ngInject */
    function ProjetoCtrl($scope,$apiService,$modalservice,$window,$ALUNO) {

        $scope.data = {};
        $scope.data.aluno = $ALUNO;
        $scope.data.isAluno = true;
        $scope.data.projeto = null;
        $scope.salvarProjeto = salvarProjeto;
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
                console.log(projeto.data); 
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
  }
    
})();
