'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Surveys',
	function($scope, Authentication, Surveys) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		console.log($scope.authentication.user._id);
		$scope.find = function() {
			console.log("find()");
			$scope.surveys = Surveys.query();
		};
	}
]);