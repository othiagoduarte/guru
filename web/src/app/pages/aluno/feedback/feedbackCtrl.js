(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.feedback')

	.controller('feedbackCtrl', FeedbackCtrl);
    
 	/** @ngInject */
	function FeedbackCtrl($scope,$modalservice,$apiService,$PROFESSOR) {

		var dbFeedback = $apiService.feedback;

    	$scope.data = {};
 		
	}
})();