(function () {
  'use strict';
angular.module('BlurAdmin.pages.orientador.dashboard')

	.controller('dashboardCtrl', dashboardCtrl);
    
 	/** @ngInject */
	function dashboardCtrl($scope,$modalservice,$apiService,$window) {

		$scope.data = {};
	}
})();