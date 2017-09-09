(function () {
    'use strict';

    var app = angular.module('BlurAdmin.pages.aluno.modals', []);

    app.service('$modalservice', modalservice);
    app.controller('solicitacaoOrientacaoCtrl', solicitacaoOrientacaoCtrl);

    function modalservice($uibModal) {

        this.detalhar = function (modalData) {
            return $uibModal.open({
                animation: true,
                templateUrl: modalData.template,
                size: modalData.size || 'md',
                controller: detalharCtrl,
                resolve: {
                    param: modalData,
                }
            });
        }

        this.executar = function (modalData) {
           return  $uibModal.open({
                    animation: true,
                    templateUrl: modalData.template,
                    size: modalData.size || 'md',
                    controller: executarCtrl,
                    resolve: {
                        param: modalData,
                    }
                });
        }
 
        this.solicitar = function ( al , prof) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/modals/template/solicitacaoOrientacao.html',
                size: 'md',
                controller: solicitacaoOrientacaoCtrl,
                resolve: {
                    professor: prof,
                    aluno: al
                }
            });
        }

        this.solicitacaoOrientacaoDetalhes = function (sol) {    
            
            return $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/modals/template/SolicitacaoOrientacaoDetalhes.html',
                size: 'md',
                controller: SolicitacaoOrientacaoDetalhesCtrl,
                resolve: {
                    solicitacao:sol
                }
            });
        }
        
        this.informacao = function (ret) {    
            return $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/modals/template/informacao.html',
                size: 'sm',
                controller: modalCtrl,
                resolve: {
                    retorno:ret
                }
            });
        }
        
        this.atencao = function (ret) {    
            return $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/modals/template/atencao.html',
                size: 'sm',
                controller: modalCtrl,
                resolve: {
                    retorno: ret
                }
            });
        }  
}

    /** @ngInject */
    function executarCtrl($scope,param){
        $scope.data = param.data;
        $scope.func = param.func;
        $scope.func2 = param.func2;
        $scope.executar = function (fechar){
            $scope.func($scope.data,fechar);
        }
    }
    

    /** @ngInject */
    function detalharCtrl($scope,param){
        $scope.data = param.data;
        $scope.func = param.func;
        $scope.func2 = param.func2;
        $scope.executar = function (fechar){
            $scope.func($scope.data);
            fechar();
        }
    }
    function modalCtrl($modalservice,$scope,retorno) {
        
        $scope.retorno = retorno;
        
        function ok(fechar){
            fechar();
        }
        function ExecutarOperacao(executar,fechar){
            executar();
            fechar();
        }
    }
    /** @ngInject */
    function SolicitacaoOrientacaoDetalhesCtrl($scope,solicitacao){
        $scope.solicitacao = solicitacao;
    }
    /** @ngInject */
    
    function solicitacaoOrientacaoCtrl($scope,$apiService,$validarService,professor,aluno,$modalservice) {
        
        $scope.enviarSolicitacao = enviarSolicitacao;
        $scope.solicitacao = {};        
        $scope.solicitacao.aluno = aluno;
        $scope.solicitacao.professor = professor;
        
        function enviarSolicitacao (fechar){
            
            var retorno = $validarService.solicitacao($scope.solicitacao);
            if(retorno.valido){
                
                $apiService.solicitacao.Add($scope.solicitacao)
                .then(function(){
                    retorno.titulo = "Parabéns";
                    retorno.mensagem = "Sucesso enviar solicitação";
                    $modalservice.informacao(retorno);
                    fechar();
                })
                .catch(function(response) {
                    retorno.titulo = "Atenção";
                    retorno.mensagem = response.data.message || "Não foi possivel enviar solicitacao";
                    console.log(response);
                    $modalservice.atencao(retorno);
                    fechar();
                });
            
                  
            }else{         
                retorno.titulo = "Atenção";
                $modalservice.atencao(retorno);
            }  
        }
    }

})();