(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.orientandos')

	.controller('OrientandosCtrl', OrientandosCtrl);
    
 	/** @ngInject */
	function OrientandosCtrl($scope,$apiService, $modalservice,$PROFESSOR) {
		
		var dbAlunos = $apiService.aluno;
		var dbProjeto = $apiService.projeto;

		$scope.data = {};
		$scope.filtroSkilss = [];
		
		dbAlunos.GetByOrientando($PROFESSOR._id)
		.then(function(alunos){
			$scope.data.alunos = alunos.data.alunos;
		});
    	
		$scope.EnviarMensagem = function(aluno){
			
		}

		$scope.VerProjeto = function(aluno){

			var dados = {};
 
			dbProjeto.GetByAluno(aluno.matricula)
			.then(function (projeto){
				dados.projeto = projeto.data;
			});

			$modalservice.executar({
				func:visualizarProjeto,
				data:dados,
				size:'lg',
				template:'app/pages/componentes/projeto/projeto.html'
			});
		}

		function visualizarProjeto(){

		}

	}
})();