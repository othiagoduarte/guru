(function () {
  'use strict';
angular
.module('BlurAdmin.pages.aluno.orientadores')
.controller('OrientadoresCtrl', OrientadoresCtrl);
/** @ngInject */
	function OrientadoresCtrl($scope,$modalservice,$apiService,$window) {

		$scope.data = {};
		$scope.filtroSkilss = [];
		$scope.disponibilidade = {name:"nao"};
		$scope.data.temOrientador = true;
		$scope.data.temProjeto = false;

		var _user = $window.sessionStorage.user;
		
		function init(){
			carregarSkills();
			carregarAlunos();
			carregarProfessores();
		}

		init();

		function carregarSkills(){
			$apiService.skill.GetAll()
			.then(function(skills){
				$scope.data.skills = skills.data;
			})
			.catch(function(data) {
				console.log(data);
			});	
		}
			
		function carregarProfessores(){
			$apiService.professor.GetAll()
			.then(function(professores){
				$scope.data.professores = professores.data;
			})
			.catch(function(data) {
				console.log(data);
			});	
		}

		function carregarAlunos(){
			$apiService.aluno.GetByUser(_user)
			.then(function(aluno){
				$scope.data.aluno = aluno.data;
				$scope.data.temOrientador = ($scope.data.aluno.orientador != undefined);
				verificarProjetoCriado();
			})
			.catch(function(data) {
				console.log(data);
			});	
		}

		function verificarProjetoCriado(){
			$apiService.projeto.GetByAluno($scope.data.aluno.matricula)
			.then(function(projeto){
				$scope.data.temProjeto = projeto.data != null;
			});		
		}

		$scope.solicitar = function(professor){
			if($scope.data.temProjeto){
				$modalservice.solicitar($scope.data.aluno, professor);				
			}else{
				$modalservice.informacao({titulo:"Mensagem",mensagem:"Para enviar uma solicitação de orientação é necessário definir o projeto. Acesso: [Meu Projeto/Detalhes do Projeto]"})
				.closed.then(function(){
					$window.location.href ="#/aluno/projeto";
				});				
			}
    	}

		$scope.EnviarMensagem = function(professor){
			$modalservice.informacao({titulo:"Mensagem",mensagem:"Desculpe aluno, estou indisponível"});
		}
    	
		$scope.pontos_skills  = function(professor){
			var pontos = null;
			if ($scope.filtroSkilss.length > 0) {
				angular.forEach(professor.skills, function(item) {
					if (!($.inArray(item, $scope.filtroSkilss) < 0)){
						pontos++;
					}						
		   		});
			}
			return pontos;
		}
		
		$scope.incluirSkill = function(Skill) {
			var i = $.inArray(Skill, $scope.filtroSkilss);
			if (i > -1) {
				$scope.filtroSkilss.splice(i, 1);
			} else {
				$scope.filtroSkilss.push(Skill);
			}
		}

		$scope.filtrarSkilss = function(professor) {
        	
			if ($scope.disponibilidade.name == "sim") {
				if (!professor.disponivel) {
					return ;
				}
			}
			var filtrar = false;
			
			if ($scope.filtroSkilss.length > 0) {
				angular.forEach(professor.skills, function(item) {		
					if (!($.inArray(item,$scope.filtroSkilss) < 0)){
						filtrar = true;
					}						
		   		});
			}
			else{
				filtrar = true;
			}

			if(filtrar){
				return professor;
			}
			return ;
		}
	}
})();

function l_mensagens(){
  
	mensagens = { 	mensagem001: "Para encontrar um orientador ideal selecione as habilidades",
    				mensagem002: ""
				}
	return mensagens;
}