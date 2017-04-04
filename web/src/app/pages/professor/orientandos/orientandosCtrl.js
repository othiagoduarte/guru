(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.orientandos')

	.controller('OrientandosCtrl', OrientandosCtrl);
    
 	/** @ngInject */
	function OrientandosCtrl($scope,$apiService, $modalservice,$PROFESSOR) {
		
		var dbAlunos = $apiService.aluno;
		var dbProjeto = $apiService.projeto;
		var dbOrientacao = $apiService.orientacao;

		$scope.data = {};
		$scope.filtroSkilss = [];
		$scope.VerProjeto = VerProjeto;
		$scope.Agendar = Agendar; 
		
		dbAlunos.GetByOrientando($PROFESSOR._id)
		.then(function(alunos){
			$scope.data.alunos = alunos.data.alunos;
		});
    	
		function VerProjeto (aluno){

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
		
		function Agendar(aluno){

			var dados = {};
			
			dados.aluno = aluno;
			dados.professor = $PROFESSOR;

			$modalservice.executar({
				func:AgendarOrientacao,
				data:dados,
				size:'lg',
				template:'app/pages/componentes/orientacao/agendar.html'
			});
		}

		function visualizarProjeto(){

		}

		function AgendarOrientacao(dados){

			dbOrientacao.Add(dados)
			.then(function(){
				$modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao agendar Orientação!"});
			});
		}
		

	}
})();