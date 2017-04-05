(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.orientacao')

	.controller('orientacaoCtrl', OrientacaoCtrl);
    
 	/** @ngInject */
	function OrientacaoCtrl($scope,$modalservice,$apiService,$ALUNO) {

		var dbOrientacao = $apiService.orientacao;

    	$scope.data = {};
		$scope.traduzSolicitacao = traduzSolicitacao;
		$scope.Detalhes = Detalhes;

		dbOrientacao.GetByAluno($ALUNO._id)
		.then(function(orientacao){
			$scope.data.orientacoes = orientacao.data;
		});
		
		 function Detalhes(pOrientacao){

			$modalservice.detalhar({
				data:pOrientacao,
				size:'lg',
				template:'app/pages/componentes/orientacao/detalhes.html'
			});
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