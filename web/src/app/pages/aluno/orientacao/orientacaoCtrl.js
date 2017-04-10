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
		$scope.Responder = Responder;
		$scope.filtrarStatusEnviado = filtrarStatusEnviado;
		$scope.filtrarStatusConfirmado = filtrarStatusConfirmado; 
		$scope.filtrarStatusRejeitado = filtrarStatusRejeitado

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
		
		function Responder(pOrientacao){
			pOrientacao.listStatus = [{cod:'C',descricao:'Confirmada'},{cod:'R',descricao:'Recusada'}];
			$modalservice.executar({
				func:ResponderOrientacao,
				data:pOrientacao,
				size:'lg',
				template:'app/pages/componentes/orientacao/responder.html'
			});
		}

		function ResponderOrientacao(dados,fecharModal){
			dbOrientacao.Save(dados)
			.then(function(){
				$modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao agendar Orientação!"});
				fecharModal();
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

		function filtrarStatusEnviado(orientacao){
			if(orientacao.status.cod == 'E'){
				return orientacao;
			}else{
				return;
			}			
		}

		function filtrarStatusConfirmado(orientacao){	
			if(orientacao.status.cod == 'C'){
				return orientacao;
			}else{
				return;
			}			
		}

		function filtrarStatusRejeitado(orientacao){
			if(orientacao.status.cod == 'R'){
				return orientacao;
			}else{
				return;
			}		
		}
	}
})();