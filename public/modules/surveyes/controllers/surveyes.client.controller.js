'use strict';

// Surveyes controller
angular.module('surveyes').controller('SurveyesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveyes',
	function($scope, $stateParams, $location, Authentication, Surveyes) {
		$scope.authentication = Authentication;

		// Create new Surveye
		$scope.create = function() {
			// Create new Surveye object
			var surveye = new Surveyes ({
				name: this.name
			});

			// Redirect after save
			surveye.$save(function(response) {
				$location.path('surveyes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Surveye
		$scope.remove = function(surveye) {
			if ( surveye ) { 
				surveye.$remove();

				for (var i in $scope.surveyes) {
					if ($scope.surveyes [i] === surveye) {
						$scope.surveyes.splice(i, 1);
					}
				}
			} else {
				$scope.surveye.$remove(function() {
					$location.path('surveyes');
				});
			}
		};

		// Update existing Surveye
		$scope.update = function() {
			var surveye = $scope.surveye;

			surveye.$update(function() {
				$location.path('surveyes/' + surveye._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Surveyes
		$scope.find = function() {
			$scope.surveyes = Surveyes.query();
		};

		// Find existing Surveye
		$scope.findOne = function() {
			$scope.surveye = Surveyes.get({ 
				surveyeId: $stateParams.surveyeId
			});
		};
	}
]);