(function () {
  'use strict';
angular.module('BlurAdmin.pages.professor.orientandos')

	.controller('OrientandosCtrl', OrientandosCtrl);
    
 	/** @ngInject */
	function OrientandosCtrl($scope,$apiService, $modalservice,$PROFESSOR,$uibModal,$timeout) {
		
		
		var dbAlunos = $apiService.aluno;
		var dbProjeto = $apiService.projeto;
		var dbOrientacao = $apiService.orientacao;
		
		$scope.VerProjeto = VerProjeto;
		$scope.Agendar = Agendar; 
		$scope.Feedback = Feedback; 
		$scope.VerEtapas = VerEtapas;
		
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
					template:'app/pages/componentes/projeto/projeto-modal.html'
				});
			});
		}
		
		function VerEtapas(aluno){
			dbProjeto.GetByAluno(aluno.matricula)
			.then(function (projeto){
				
				$uibModal.open({
					animation: true,
					templateUrl:'app/pages/componentes/projeto/etapas/etapas-modal.html',
					size: 'lg',
					controller: VerEtapasCtrl,
					resolve: {
						param: projeto.data,
					}
				});	
			});
		}
		
		function VerEtapasCtrl($scope,param){
			$scope.projeto = param;
			$scope.Feedback = Feedback; 
			$scope.EditarEtapa = EditarEtapa;			
		}
		
		function EditarEtapa(pDados,projeto){    
            pDados.projeto = { _id: projeto._id};
            $modalservice.executar({
                func:EditarEtapaCtrl,
                data:{etapa:pDados,projeto: pDados.projeto },
                size:'lg',
                template:'app/pages/componentes/projeto/etapas/etapa.html'
            });
        } 

        function EditarEtapaCtrl(pDados,fecharModal){
            $apiService.projeto.EditarEtapa(pDados)
            .then(function(projeto){
            
                $scope.data.projeto = {};
                
                $timeout(function(){
                    $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao salvar os dados da etapa"});
                    if(fecharModal){
                        fecharModal();
                    }

                    $scope.$apply(function(){
                        $scope.data.projeto = projeto.data ;                    
                    });
                });            
            })
            .catch(function(data) {
                var retorno = {};
                retorno.titulo = "Atenção";
                retorno.mensagem = "Não foi editar etapa!";
                fecharModal();
                $modalservice.atencao(retorno);
             });
        } 
		
		
		function Feedback(etapa,projeto){
			$modalservice.executar({
				func:EnviarFeedback,
				data:{etapa: etapa, projeto: projeto },
				size:'lg',
				template:'app/pages/componentes/feedback/enviar-feedback.html'
			});
		}
		
		function EnviarFeedback(pDados,fecharModal){
			pDados.etapa.feedback.push({assunto:pDados.assunto, detalhe:pDados.detalhe});
			dbProjeto.EditarEtapa(pDados)
			.then(function(){
				$modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao enviar o feedback"});
				fecharModal();
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