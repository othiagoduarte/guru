(function () {
  'use strict';
angular.module('BlurAdmin.pages.comunicacao')

	.controller('comunicacaoCtrl', comunicacaoCtrl);
    
 	/** @ngInject */
	function comunicacaoCtrl($scope,$apiService,$modalservice) {
    var timelineBlocks = $('.cd-timeline-block');
    var offset = 0.8;

    $scope.isCoordenador = sessionStorage.perfil == "COORDENADOR";
    $scope.traduzTipo = traduzTipo;
    $scope.addComunicado = addComunicado;
    $scope.edtComunicado = edtComunicado;
    $scope.data = {};
    $scope.data.comunicados = [];
       
    $scope.data.listTipo = [
             {descricao:"Aviso",value:1}
            ,{descricao:"Arquivo",value:2}
            ,{descricao:"Dica",value:3}
    ];
    
    $apiService.comunicado.GetAll()
		.then(function(comunicados){
			$scope.data.comunicados = comunicados.data;
		})
		.catch(function(data) {
			console.log(data);
		});

    function edtComunicado(pComunicado){
        
        var _comunicado = angular.copy(pComunicado);
        
        $modalservice.executar({
            func1:edtComunicadoCtrl,
            func2:excluirComunicadoCtrl,
            data:{comunicado: _comunicado, listTipo:$scope.data.listTipo},
            size:'lg',
            template:'app/pages/comunicacao/comunicado-modal.html'
        });  
    }
    
    function addComunicado(pComunicado){
        $modalservice.executar({
            func:addComunicadoCtrl,
            data:{comunicado:pComunicado},
            size:'lg',
            template:'app/pages/comunicacao/comunicado-modal.html'
        });    
    }
    
    function excluirComunicadoCtrl(pDados,fecharModal){
        var _dados = { projeto: pDados, etapa:pDados.etapa };
            
        $apiService.comunicado.Add(_dados)
        .then(function(comunicado){
                          
              $timeout(function(){
                $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao criar etapa"});
                fecharModal();
              });            
          })
          .catch(function(data) {
              var retorno = {};
              retorno.titulo = "Atenção";
              retorno.mensagem = "Não foi criar etapa!";
              $modalservice.atencao(retorno);
                  fecharModal();
             });
    }
    
    function edtComunicadoCtrl(pDados,fecharModal){

        var _dados = { projeto: pDados, etapa:pDados.etapa };
            
        $apiService.comunicado.Add(_dados)
        .then(function(comunicado){
                          
              $timeout(function(){
                $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao criar etapa"});
                fecharModal();

              });            
          })
          .catch(function(data) {
              var retorno = {};
              retorno.titulo = "Atenção";
              retorno.mensagem = "Não foi criar etapa!";
              $modalservice.atencao(retorno);
                  fecharModal();
             });
      }
      
      function addComunicadoCtrl(pDados,fecharModal){

        var _dados = { projeto: pDados, etapa:pDados.etapa };
            
        $apiService.comunicado.Add(_dados)
        .then(function(comunicado){
                          
              $timeout(function(){
                $modalservice.informacao({titulo:"Mensagem",mensagem:"Sucesso ao criar etapa"});
                fecharModal();

              });            
          })
          .catch(function(data) {
              var retorno = {};
              retorno.titulo = "Atenção";
              retorno.mensagem = "Não foi criar etapa!";
              $modalservice.atencao(retorno);
                  fecharModal();
             });
        }

    function traduzTipo(pTipo){

        if (pTipo == 1){
          return 'Bell';
        }
        if (pTipo == 2){
          return 'Download-Computer';
        }
        if (pTipo == 3){
          return 'Paper-Plane';
        }

        return 'Boss-3';
    }
    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function () {
      if (!window.requestAnimationFrame) {
        setTimeout(function () {
          showBlocks(timelineBlocks, offset);
        }, 100);
      } else {
        window.requestAnimationFrame(function () {
          showBlocks(timelineBlocks, offset);
        });
      }
    });

    function hideBlocks(blocks, offset) {
      blocks.each(function () {
        ( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
      });
    }

    function showBlocks(blocks, offset) {
      blocks.each(function () {
        ( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      });
    }
  }
})();