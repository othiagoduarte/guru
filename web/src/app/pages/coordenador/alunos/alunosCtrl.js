(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.alunos')
    .controller('alunosCtrl', alunosCtrl);
    
 /** @ngInject */
  function alunosCtrl($scope,$apiService,$window,$modalservice) {
    
    $scope.dashboard = dashboard;

		function dashboard(aluno){
        $modalservice.informacao({titulo:"Mensagem",mensagem:"dashboard!"});
    }

    $scope.data = {};
    $apiService.aluno.GetAll()
		.then(function(response){
			$scope.data.alunos = response.data;
		})
		.catch(function(response) {
			console.log(response);
		});
  }

})();
