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
       
    $apiService.comunicado.GetAll()
		.then(function(comunicados){
			$scope.data.comunicados = comunicados.data;
		})
		.catch(function(data) {
			console.log(data);
		});
    
    function addComunicado(){
        $modalservice.informacao({titulo:"Mensagem",mensagem:"Inclsão de comunicado!"});
    }

    function edtComunicado(pComunicado){
        $modalservice.informacao({titulo:"Mensagem",mensagem:"Edição de comunicado!"});
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