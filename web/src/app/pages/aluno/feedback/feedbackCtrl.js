(function () {
  'use strict';
angular.module('BlurAdmin.pages.aluno.feedback')

	.controller('feedbackCtrl', FeedbackCtrl);
    
 	/** @ngInject */
	function FeedbackCtrl($scope,$modalservice,$apiService,$ALUNO) {
			$scope.data = {};
			$apiService.projeto.GetFeedbacks($ALUNO._id)
			.then(function (response){
				$scope.data.feedbacks = response.data; 
				
			}); 		
	}
})();