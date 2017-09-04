(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.alunos')
    .controller('alunosCtrl', alunosCtrl);
    
 /** @ngInject */
  function alunosCtrl($scope,$apiService,$window,$modalservice) {
    
	$scope.data = {};
    $scope.dashboard = dashboard;
	$scope.cadastrarAlunos = cadastrarAlunos;
	$scope.cadastrandoAluno = false;
	$scope.editarAluno = editarAluno;

	AtualizarListaAlunos();

	function dashboard(aluno){
        $modalservice.informacao({titulo:"Mensagem",mensagem:"dashboard!"});
    }
	
	function editarAluno(pDados){
		$scope.cadastrandoAluno = true;
		
        $modalservice.executar({
            func:editarAlunoCtrl,
            data: {aluno: Object.assign({},pDados)},
            size:'lg',
            template:'app/pages/coordenador/alunos/cadastro-aluno.html'
        })
		.closed.then(function(){
			$scope.cadastrandoAluno = false;
		});    
    }

	function editarAlunoCtrl(pDados, fecharModal){
		console.log(pDados);
		// $apiService.aluno.save(pDados)
		// .then(function(){
        // 	$modalservice.informacao({titulo:"Sucesso",mensagem:"Sucesso ao cadastrar aluno!"});
		// 	fecharModal();
		// 	AtualizarListaAlunos();	
		// })
		// .catch(function(response){
        // 	$modalservice.informacao({titulo:"Erro",mensagem:response.data});
		// });
	}

    function cadastrarAlunos(){
		$scope.cadastrandoAluno = true;
		
        $modalservice.executar({
            func:cadastrarAlunosCtrl,
            data:{},
            size:'lg',
            template:'app/pages/coordenador/alunos/cadastro-aluno.html'
        })
		.closed.then(function(){
			$scope.cadastrandoAluno = false;
		});    
    }

	function cadastrarAlunosCtrl(pDados, fecharModal){
		$apiService.aluno.add(pDados)
		.then(function(){
        	$modalservice.informacao({titulo:"Sucesso",mensagem:"Sucesso ao cadastrar aluno!"});
			fecharModal();
			AtualizarListaAlunos();	
		})
		.catch(function(response){
        	$modalservice.informacao({titulo:"Erro",mensagem:response.data});
		});
	}

	function AtualizarListaAlunos(){
		$apiService.aluno.GetAll()
		.then(function(response){
			$scope.data.alunos = response.data;
		})
		.catch(function(response) {

		});
	}

  }

})();
