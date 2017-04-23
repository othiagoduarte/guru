(function () {
  'use strict';
angular.module('BlurAdmin.pages.coordenador.comunicacao')

	.controller('dashboardCtrl', dashboardCtrl);
    
 	/** @ngInject */
	function dashboardCtrl($scope,$modalservice,$apiService,$window) {

		$scope.data = {};
	}
})();