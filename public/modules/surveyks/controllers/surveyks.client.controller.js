'use strict';

// Surveyks controller
angular.module('surveyks').controller('SurveyksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveyks',
	function($scope, $stateParams, $location, Authentication, Surveyks) {
		$scope.authentication = Authentication;
		
		console.log($stateParams.surveykId);
		
		// Create new Surveyk
		$scope.create = function() {
			// Create new Surveyk object
			var surveyk = new Surveyks ({
				name: this.name
			});

			// Redirect after save
			surveyk.$save(function(response) {
				$location.path('surveyks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Surveyk
		$scope.remove = function(surveyk) {
			if ( surveyk ) { 
				surveyk.$remove();

				for (var i in $scope.surveyks) {
					if ($scope.surveyks [i] === surveyk) {
						$scope.surveyks.splice(i, 1);
					}
				}
			} else {
				$scope.surveyk.$remove(function() {
					$location.path('surveyks');
				});
			}
		};

		// Update existing Surveyk
		$scope.update = function() {
			var surveyk = $scope.surveyk;

			surveyk.$update(function() {
				$location.path('surveyks/' + surveyk._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Surveyks
		$scope.find = function() {
			$scope.surveyks = Surveyks.query();
		};

		// Find existing Surveyk
		$scope.findOne = function() {
			$scope.surveyk = Surveyks.get({ 
				surveykId: $stateParams.surveykId
			});
		};
	}
]);