(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.orientadores')
    .controller('OrientadoresCtrl', OrientadoresCtrl);
    
 /** @ngInject */
  function OrientadoresCtrl($scope,$apiService,$window,$modalservice, _) {
    
    $scope.dashboard = dashboard;
	$scope.addOrientador = addOrientador;
	$scope.editarOrientador = editarOrientador; 
	$scope.cadastrando = false;	
	$scope.loadTags = loadTags;
    $scope.data = {};
	
	function init(){
		carregarProfessor();
	};

	init();
	
	function dashboard(pProfessor){
        $modalservice.informacao({titulo:"Mensagem",mensagem:"dashboard!"});
    }

	function carregarProfessor(){
		$apiService.professor.GetAll()
		.then(function(response){
			$scope.data.professores = response.data;
		})
		.catch(function(data) {
			console.log(data);
		});	
	}
	
	function editarOrientador(orientador){
		$scope.cadastrando = true;		
        $modalservice.executar({
            func:editarOrientadorCtrl,
            data:{orientador: Object.assign({}, orientador)},
            size:'lg',
            template:'app/pages/coordenador/orientadores/cadastro-professor.html'
        })
		.closed.then(function(){
			$scope.cadastrando = false;
		});    		
	}
	
	function editarOrientadorCtrl(pDados, fecharModal){
		pDados.orientador.skills = builderSkill(pDados.orientador.skills); 		
		$apiService.professor.Save(pDados.orientador)
		.then(function(){
        	$modalservice.informacao({titulo:"Sucesso",mensagem:"Sucesso ao cadastrar professor!"});
			fecharModal();
			init();
		})
		.catch(function(response){
			$modalservice.informacao({titulo:"Erro",mensagem:response.data});
			init();			
		});
	}
	    
    function addOrientador(){
		$scope.cadastrando = true;
        $modalservice.executar({
            func:addOrientadorCtrl,
            data:{},
            size:'lg',
            template:'app/pages/coordenador/orientadores/cadastro-professor.html'
        })
		.closed.then(function(){
			$scope.cadastrando = false;
		});    		
	}
	
	function addOrientadorCtrl(pDados, fecharModal){
		$apiService.professor.Add(pDados.orientador)
		.then(function(){
        	$modalservice.informacao({titulo:"Sucesso",mensagem:"Sucesso ao cadastrar professor!"});
			fecharModal();
		})
		.catch(function(response){
        	$modalservice.informacao({titulo:"Erro",mensagem:response.data});
		});
		init();
	}

	function builderSkill(skills){
		return _.map(skills, function (item){
			return item.text;
		});
	}

	function loadTags(query){
		return $apiService.skills.GetAll();
	}
  }

})();
