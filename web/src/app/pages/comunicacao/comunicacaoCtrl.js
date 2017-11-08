(function () {
	'use strict';
	angular.module('BlurAdmin.pages.comunicacao')
		.controller('comunicacaoCtrl', comunicacaoCtrl);

	/** @ngInject */
	function comunicacaoCtrl($scope, $apiService, $modalservice, $timeout) {
		var timelineBlocks = $('.cd-timeline-block');
		var offset = 0.8;

		$scope.podeIncluirComunicado = sessionStorage.perfil == "COORDENADOR" || sessionStorage.perfil == "PROFESSOR";
		$scope.traduzTipo = traduzTipo;
		$scope.addComunicado = addComunicado;
		$scope.edtComunicado = edtComunicado;
		$scope.autor = obterAutor();

		console.log($scope.usuario);

		$scope.data = {};
		$scope.data.comunicados = [];		
		$scope.data.listTipo = [
			{ descricao: "Aviso", value: 1 }
			, { descricao: "Arquivo", value: 2 }
			, { descricao: "Dica", value: 3 }
		];
		
		init();
		
		function apply(){
			if(!$scope.$$phase){
				$scope.$apply();
			}
		}

		
		function init(){
			buscarTodosComunicados();
		}

		function buscarListaAutoresComunicados(){
			var autores = ["COORDENADOR"] ;	
			if(!verificaPerfilCoordenador()){
				if(verificaPerfilProfessor()){
					autores.push(obterIdUsuario());					
				}else{
					autores.push(obterIdOrientador() || "");										
				}
			}
			return autores;
		}

		function buscarTodosComunicados() {
			$apiService.comunicado.GetAll(buscarListaAutoresComunicados())
				.then(function (comunicados) {
					$scope.data.comunicados = comunicados.data;
					apply();
				})
				.catch(function (data) {
					console.log(data);
				});
		}
		function edtComunicado(pComunicado) {
			var _comunicado = angular.copy(pComunicado);
			$modalservice.executar({
				func: edtComunicadoCtrl,
				func2: excluirComunicadoCtrl,
				data: { comunicado: _comunicado, listTipo: $scope.data.listTipo },
				size: 'lg',
				template: 'app/pages/comunicacao/comunicado-modal.html'
			});
		}

		function addComunicado(pComunicado) {
			$modalservice.executar({
				func: addComunicadoCtrl,
				data: { comunicado: pComunicado },
				size: 'lg',
				template: 'app/pages/comunicacao/comunicado-modal.html'
			});
		}

		function verificaPerfilProfessor(){
			return sessionStorage.perfil == "PROFESSOR"
		}
		
		function verificaPerfilCoordenador(){
			return sessionStorage.perfil == "COORDENADOR";
		}

		function obterUsuario(){
			return JSON.parse(sessionStorage.userData);
		}

		function obterIdUsuario(){
			return obterUsuario()._id;
		}

		function obterAutor(){
			if(verificaPerfilCoordenador()) return "COORDENADOR";
			if(verificaPerfilProfessor()) return obterIdUsuario();
			return null;
		}

		function obterIdOrientador(){
			var usuario = obterUsuario();
			return usuario.orientador ? usuario.orientador._id : null;
		}

		function excluirComunicadoCtrl(pDados, fecharModal) {
			var modal = this;
			$apiService.comunicado.Delete(pDados.comunicado._id)
				.then(function (comunicado) {
					$modalservice.informacao({ titulo: "Mensagem", mensagem: "Sucesso ao excluir comunicado" });
					modal.$dismiss();
					buscarTodosComunicados();
				})
				.catch(function (data) {
					$modalservice.atencao({ titulo: "Atenção", mensagem: "Não foi possivel excluir o comunicado!" });					
					modal.$dismiss();
					buscarTodosComunicados();
				});
		}

		function edtComunicadoCtrl(pDados) {
			var modal = this;
			$apiService.comunicado.Save(pDados.comunicado)
				.then(function (comunicado) {
					$modalservice.informacao({ titulo: "Mensagem", mensagem: "Sucesso ao editar comunicado" });
					modal.$dismiss();
					buscarTodosComunicados();
				})
				.catch(function (data) {
					$modalservice.atencao({ titulo: "Atenção", mensagem: "Não foi possivel editar o comunicado!" });
					modal.$dismiss();
					buscarTodosComunicados();
				});
		}

		function addComunicadoCtrl(pDados, fecharModal) {
			var modal = this;

			if(verificaPerfilProfessor()){
				pDados.comunicado.autor = obterIdUsuario();				
			} 
		
			$apiService.comunicado.Add(pDados.comunicado)
				.then(function (comunicado) {
					$modalservice.informacao({ titulo: "Mensagem", mensagem: "Sucesso ao criar comunicado" });
					modal.$dismiss();		
					buscarTodosComunicados();			
				})
				.catch(function (data) {
					$modalservice.atencao({ titulo: "Atenção", mensagem: "Não foi possivel criar o comunicado!" });
					modal.$dismiss();	
					buscarTodosComunicados();				
				});
		}

		function traduzTipo(pTipo) {
			if (pTipo == 1) {
				return 'Bell';
			}
			if (pTipo == 2) {
				return 'Download-Computer';
			}
			if (pTipo == 3) {
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
				($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
			});
		}

		function showBlocks(blocks, offset) {
			blocks.each(function () {
				($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			});
		}
	}
})();