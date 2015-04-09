'use strict';

angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys',
	function($scope, $stateParams, $location, Authentication, Surveys, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var survey = new Surveys({
				title: this.title,
				numQues: this.numQues,
                surveyType: this.surveyType,
                surveyAnsA: 0,
                surveyAnsB: 0
			});

			survey.$save(function(response) {
				$location.path('surveys/' + response._id);

				$scope.title = '';
				$scope.numQuest = '';
                $scope.surveyType = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
        
		$scope.remove = function(survey) {
			if (survey) {
				survey.$remove();

				for (var i in $scope.surveys) {
					if ($scope.surveys[i] === survey) {
						$scope.surveys.splice(i, 1);
					}
				}
			} else {
				$scope.survey.$remove(function() {
					$location.path('surveys');
				});
			}
		};

		$scope.update = function() {
			var survey = $scope.survey;

			survey.$update(function() {
				$location.path('surveys/' + survey._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.surveys = Surveys.query();
		};

		$scope.findOne = function() {
			$scope.survey = Surveys.get({
				surveyId: $stateParams.surveyId
			});
		};
	}
]);

angular.module('surveysQuestion').controller('SurveysQuestionController', ['$scope', '$stateParams', '$location', 'Surveys',
	function($scope, $stateParams, $location, Surveys) {
        
        $scope.inputResult = function() {
            var survey = $scope.survey;
            var ansA = survey.surveyAnsA;
            var ansB = survey.surveyAnsB;
            if($scope.surveyAnswer == 1)
            {
                survey.surveyAnsA++;
            }
            else if($scope.surveyAnswer == 2)
            {
                survey.surveyAnsB++;
            }
            $scope.update();
			console.log($stateParams.survyeId);
            console.log($scope.surveyAnswer);            
            console.log(survey.surveyAnsA + " " + survey.surveyAnsB);
		};

		$scope.update = function() {
			var survey = $scope.survey;

			survey.$update(function() {
				$location.path('surveys/thankyou');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.findOne = function() {
			$scope.survey = Surveys.get({
				surveyId: $stateParams.surveyId
			});
		};
	}
]);

