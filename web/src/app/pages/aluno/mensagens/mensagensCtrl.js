(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.mensagens')

	.controller('mensagensCtrl', MensagensCtrl);
    
 	/** @ngInject */
	function MensagensCtrl($scope,$modalservice,$apiService,$ALUNO) {

    	$scope.data = {};
		$scope.traduzSolicitacao = traduzSolicitacao;
		$scope.solicitacaoOrientacaoDetalhes = solicitacaoOrientacaoDetalhes;
		$apiService.solicitacao.GetByAluno($ALUNO._id)
		.then(function(solicitacao){
			$scope.data.solicitacoes = solicitacao.data;
		});
		
		function solicitacaoOrientacaoDetalhes(solicitacao){
			
			$scope.solicitacao = solicitacao;
			$modalservice.solicitacaoOrientacaoDetalhes($scope.solicitacao);
		}

		function traduzSolicitacao(status){
			
			if (status == "E") {
				return "Enviado";
			}
			if (status == "A") {
				return "Aceito";
			}
			if (status == "R") {
				return "Recusado";
			}

			if (status == "P") {
				return "Pendente";
			}
			
			return "-";
		}
	}
})();