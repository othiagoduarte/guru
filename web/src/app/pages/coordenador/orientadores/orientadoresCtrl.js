(function () {
  'use strict';

  angular.module('BlurAdmin.pages.coordenador.orientadores')
    .controller('OrientadoresCtrl', OrientadoresCtrl);
    
 /** @ngInject */
  function OrientadoresCtrl($scope,$apiService,$window) {
    $scope.data = {};
    $apiService.professor.GetAll()
		.then(function(professores){
			$scope.data.professores = professores.data;
		})
		.catch(function(data) {
			console.log(data);
		});
  }

})();
