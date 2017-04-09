(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.orientandos')

	.controller('OrientandosCtrl', OrientandosCtrl);
    
 	/** @ngInject */
	function OrientandosCtrl($scope,$apiService, $modalservice,$PROFESSOR) {
		
		
		var dbAlunos = $apiService.aluno;
		var dbProjeto = $apiService.projeto;
		var dbOrientacao = $apiService.orientacao;
		var dbFeedback =  $apiService.feedback;
		
		$scope.VerProjeto = VerProjeto;
		$scope.Agendar = Agendar; 
		$scope.Feedback = Feedback; 

		$scope.data = {};
				
		dbAlunos.GetByOrientando($PROFESSOR._id)
		.then(function(alunos){
			$scope.data.alunos = alunos.data.alunos;
		});
    	
		function VerProjeto(aluno){
			dbProjeto.GetByAluno(aluno.matricula)
			.then(function (projeto){
				$modalservice.detalhar({
					data: {projeto:projeto.data},
					size:'lg',
					template:'app/pages/componentes/projeto/projeto-detalhe.html'
				});
			});
		}
		
		function Feedback(pAluno){
			$modalservice.executar({
				func:EnviarFeedback,
				data:{aluno: pAluno, professor: $PROFESSOR },
				size:'lg',
				template:'app/pages/componentes/feedback/enviar-feedback.html'
			});
		}
		
		function EnviarFeedback(pDados){
			dbFeedback.Add(pDados)
			.then(function(){
				$modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao enviar o feedback"});
			});
		}

		function Agendar(pAluno){
			$modalservice.executar({
				func:AgendarOrientacao,
				data:{aluno: pAluno, professor: $PROFESSOR },
				size:'lg',
				template:'app/pages/componentes/orientacao/agendar.html'
			});
		}

		function AgendarOrientacao(dados){
			dbOrientacao.Add(dados)
			.then(function(){
				$modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao agendar Orientação!"});
			});
		}
	}
})();