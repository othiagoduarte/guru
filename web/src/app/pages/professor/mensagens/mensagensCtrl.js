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
		$scope.data.listStatus = [{cod:'A',descricao:'Aceito'},{cod:'R',descricao:'Recusado'},{cod:'P',descricao:'Pendente'}];
		
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

		function responderSolicitacao($data){
			
			var retorno = {};

			$apiService.solicitacao.Save($data.solicitacao)
			.then(function(data){
				retorno.titulo = "Parabéns";
            	retorno.mensagem = "Sucesso ao enviar a resposta.";
				$modalservice.informacao(retorno);
				$data.solicitacao = {};
			})
			.catch(function(error) {
				console.log("Error:", error);
			});			
		}

		function VerProjeto (aluno,fechar){
			$apiService.projeto.GetByAluno(aluno.matricula)
			.then(function (aluno){
				var dados = {};
				dados.projeto = aluno.data;
				
				$modalservice.executar({
					data: dados,
					size:'lg',
					template:'app/pages/componentes/projeto/projeto.html'
				})
			})
			.catch(function(error) {
				console.log("Error:", error);
			});
		
			fechar();
		}

		function atualizarProjeto($data){
	
			var dbProjeto = new $model.Projeto();
			
			dbProjeto.professor = $data.solicitacao.professor;
			dbProjeto.aluno = $data.solicitacao.aluno;
			dbProjeto.titulo = $data.solicitacao.titulo;
			dbProjeto.inicio = Date.now();
			dbProjeto.curso = $data.solicitacao.aluno.curso;
			
			var retorno = dbProjeto.Validar();
			
			if(retorno.sucesso){

				return dbProjeto.Add();
			}
			
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
	}
})();