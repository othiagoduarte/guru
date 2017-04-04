(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.orientacao')

	.controller('orientacaoCtrl', OrientacaoCtrl);
    
 	/** @ngInject */
	function OrientacaoCtrl($scope,$modalservice,$apiService,$ALUNO) {

		var dbOrientacao = $apiService.orientacao;

    	$scope.data = {};
		$scope.traduzSolicitacao = traduzSolicitacao;

		dbOrientacao.GetByAluno($ALUNO._id)
		.then(function(orientacao){
			$scope.data.orientacoes = orientacao.data;
		});

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