(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.mensagens')

	.controller('mensagensCtrl', MensagensCtrl);
    
 	/** @ngInject */
	function MensagensCtrl($scope,$apiService,$modalservice,$uibModal) {

		/*VAR*/
    	var dbUsuario = {_id:"58bb5e2f7052402ef078d26e"};
		var dbProfessor = $apiService.professor;
		var dbSolicitacao =$apiService.solicitacao;
		
		/*DADOS*/
		$scope.data = {};
		$scope.data.solicitacoes = [];
		$scope.data.solicitacao = {};
		$scope.data.listStatus = [{cod:'A',descricao:'Aceito'},{cod:'R',descricao:'Recusado'},{cod:'P',descricao:'Pendente'}];
		
		dbProfessor.Get(dbUsuario._id)
		.then( function(professor){
			$scope.data.professor = professor.data;
			
			dbSolicitacao.GetByProfessor($scope.data.professor._id)
			.then(function(solicitacao){
				debugger;
				$scope.data.solicitacoes = solicitacao.data; 
			});
		});
		

		/*FUNCTION*/
		$scope.traduzSolicitacao = traduzSolicitacao;
		$scope.responderSolicitacaoDetalhes = responderSolicitacaoDetalhes;
		$scope.visualizarSolicitacaoDetalhes = visualizarSolicitacaoDetalhes;
		$scope.filtrarSolicitacaoStatusEnviado = filtrarSolicitacaoStatusEnviado;
		$scope.filtrarSolicitacaoStatusRejeitado = filtrarSolicitacaoStatusRejeitado;
		$scope.filtrarSolicitacaoStatusAceito = filtrarSolicitacaoStatusAceito;
		$scope.VerProjeto = VerProjeto;
		/*CARREGAR DADOS*/		

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
			});
		}
		
		function visualizarSolicitacao($data){
			console.log($data);
		}

		function responderSolicitacao($data){
			
			var retorno = {};
			var dbSolicitacao = $apiService.solicitacao;
			
			dbSolicitacao.Add($data)
			.then(function(data){
				retorno.titulo = "Parabéns";
            	retorno.mensagem = "Sucesso ao enviar a resposta.";
            
				$modalservice.informacao(retorno);
			
				$data.solicitacao = {};
			});		
			
		}

		function VerProjeto (aluno,fechar){
			fechar();
			var dados = {};
			var dbProjeto = $apiService.projeto;

			dbProjeto.GetByAluno(aluno.matricula)
			.then(function (aluno){
				dados.projeto = aluno.data;

				
			 $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/componentes/projeto/projeto.html',
                size: 'lg',
                controller: MensagensCtrl,
                resolve: {
                    data: data
                }
            });
			
			});

		}

		function criarProjeto($data){
	
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