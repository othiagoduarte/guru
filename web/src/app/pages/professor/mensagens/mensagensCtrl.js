(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.mensagens')

	.controller('mensagensCtrl', MensagensCtrl);
    
 	/** @ngInject */
	function MensagensCtrl($scope,$apiService,$modalservice,$uibModal,$window,$PROFESSOR) {

		$scope.traduzSolicitacao = traduzSolicitacao;
		$scope.responderSolicitacaoDetalhes = responderSolicitacaoDetalhes;
		$scope.visualizarSolicitacaoDetalhes = visualizarSolicitacaoDetalhes;
		$scope.filtrarSolicitacaoStatusEnviado = filtrarSolicitacaoStatusEnviado;
		$scope.filtrarSolicitacaoStatusRejeitado = filtrarSolicitacaoStatusRejeitado;
		$scope.filtrarSolicitacaoStatusAceito = filtrarSolicitacaoStatusAceito;
		$scope.VerProjeto = VerProjeto;
		
		$scope.data = {};
		$scope.data.solicitacoes = [];
		$scope.data.solicitacao = {};
		$scope.data.listStatus = [{cod:'A',descricao:'Aceito'},{cod:'R',descricao:'Recusado'}];
		
		var dbSolicitacao = $apiService.solicitacao;
	
		$scope.data.professor = $PROFESSOR;
		
		dbSolicitacao.GetByProfessor($scope.data.professor._id)
		.then(function(solicitacao){
			$scope.data.solicitacoes = solicitacao.data; 
		})
		.catch(function(error) {
			console.log("Error:", error);
		});		

		
		function responderSolicitacaoDetalhes(solicitacao){
			
			$scope.data.solicitacao = solicitacao;
						
			$modalservice.executar({
				func:responderSolicitacao,
				func2:VerProjeto,
				data:$scope.data,
				size:'lg',
				template:'app/pages/modals/template/ResponderSolicitacao.html'
			});
		}
		
		function visualizarSolicitacaoDetalhes(solicitacao){
			
			$scope.data.solicitacao = solicitacao;
						
			$modalservice.executar({
				func:visualizarSolicitacao,
				data:$scope.data,
				size:'lg',
				template:'app/pages/modals/template/visualizarSolicitacao.html'
			})
		}
		
		function visualizarSolicitacao($data){
			console.log($data);
		}

		function responderSolicitacao($data,fecharModal){
			
			var retorno = {};

			$apiService.solicitacao.Save($data.solicitacao)
			.then(function(data){
				retorno.titulo = "Parabéns";
            	retorno.mensagem = "Sucesso ao enviar a resposta.";
				$modalservice.informacao(retorno);
				$data.solicitacao = {};
				fecharModal();
			})
			.catch(function(error) {
				console.log("Error:", error);
				fecharModal();
			});			
		}

		function VerProjeto (aluno){
			$apiService.projeto.GetByAluno(aluno.matricula)
			.then(function (aluno){
				var dados = {};
				dados.projeto = aluno.data;
				
				$modalservice.executar({
					data: dados,
					size:'lg',
					template:'app/pages/componentes/projeto/projeto-modal.html'
				})
			})
			.catch(function(error) {
				console.log("Error:", error);
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
			if (status == "C") {
				return "Cancelado";
			}
			return "-";
		}

		function filtrarSolicitacaoStatusEnviado(solicitacao){
			if(solicitacao.status.cod == 'E'){
				return solicitacao;
			}else{
				return;
			}			
		}

		function filtrarSolicitacaoStatusAceito(solicitacao){
			if(solicitacao.status.cod == 'A'){
				return solicitacao;
			}else{
				return;
			}			
		}

		function filtrarSolicitacaoStatusRejeitado(solicitacao){
			if(solicitacao.status.cod == 'R'){
				return solicitacao;
			}else{
				return;
			}		
		}
		
		function filtrarSolicitacaoStatusCancelado(solicitacao){
			if(solicitacao.status.cod == 'C'){
				return solicitacao;
			}else{
				return;
			}		
		}
	}
})();