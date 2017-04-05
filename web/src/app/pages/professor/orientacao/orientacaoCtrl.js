(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.orientacao')

	.controller('orientacaoCtrl', OrientacaoCtrl);
    
 	/** @ngInject */
	function OrientacaoCtrl($scope,$modalservice,$apiService,$PROFESSOR) {

		var dbOrientacao = $apiService.orientacao;

    	$scope.data = {};
		$scope.traduzSolicitacao = traduzSolicitacao;
		$scope.Detalhes = Detalhes;

		dbOrientacao.GetByProfessor($PROFESSOR._id)
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
			if (status == "C") {
				return "Confirmada";
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