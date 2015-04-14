'use strict';
var surveyid;
var quesNum = 0;
var quesTotal;

angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys', 
	function($scope, $stateParams, $location, Authentication, Surveys) {
		$scope.authentication = Authentication;

		/* $scope.create = function() {
			var survey = new Surveys({
				title: this.title,
				numQues: this.numQues,
                surveyType: this.surveyType,
                surveyAnsA: 0,
                surveyAnsB: 0
			});
			quesNum = 0;
			quesTotal = this.numQues;
			survey.$save(function(response) {
				//$location.path('surveys/thankyou');
				//$location.path('question/' + survey._id);
				$location.path('questions/' + response._id);
				surveyid = response._id;

				$scope.title = '';
				$scope.numQuest = '';
                $scope.surveyType = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}; */
		
		$scope.create = function() {
			var survey = new Surveys({
				title: this.title,
				surveyQ1Title: this.surveyQ1Title,
				surveyQ2Title: this.surveyQ2Title,
				surveyQ3Title: this.surveyQ3Title,
				surveyQ4Title: this.surveyQ4Title,
				surveyQ5Title: this.surveyQ5Title,
                surveyQ1AnsA: 0,
                surveyQ1AnsB: 0,
				surveyQ2AnsA: 0,
                surveyQ2AnsB: 0,
				surveyQ3AnsA: 0,
                surveyQ3AnsB: 0,
				surveyQ4AnsA: 0,
                surveyQ4AnsB: 0,
				surveyQ5AnsA: 0,
                surveyQ5AnsB: 0,
				active: this.active
			});
			survey.$save(function(response) {
				$location.path('surveys/thankyou');
				//$location.path('question/' + survey._id);
				//$location.path('questions/' + response._id);
				surveyid = response._id;

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
			console.log("find()");
			$scope.surveys = Surveys.query();
		};

		$scope.findOne = function() {
			$scope.survey = Surveys.get({
				surveyId: $stateParams.surveyId
			});
		};
	}
]);

angular.module('questions').controller('QuestionsController', ['$scope', '$window', '$stateParams', '$location', 'Surveys', 'Questions',
	function($scope, $window, $stateParams, $location, Surveys, Questions) {
		
		console.log('quesNum,surveyid' + quesNum + ' ' + surveyid);
		
		$scope.numQues = $window.numQues;
		
		//$scope.quesBtn.value = "Next";
		
		$scope.create = function() {
			var question = new Questions({
				title: this.title,
				questionNum: quesNum,
                surveyAnsA: 0,
                surveyAnsB: 0,
				surveyId: $stateParams.surveyId
			});
			quesNum++;
			question.$save(function(response) {
				//$location.path('question');
				console.log('quesNumquesTotal' + quesNum + ' ' + quesTotal);
							
				$scope.title = '';
				$scope.questionNum = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			if(quesNum == quesTotal){
				console.log('equal');
				$location.path('surveys/' + $stateParams.surveyId);
			}	
		};
		
		$scope.update = function() {
			var question = $scope.question;

			question.$update(function() {
				$location.path('surveys/thankyou');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.findOne = function() {
			$scope.question = Questions.get({
				surveyId: $stateParams.surveyId
			});
		};
	}
]);

angular.module('surveysQuestion').controller('SurveysQuestionController', ['$scope', '$stateParams', '$location', 'Surveys', 'Questions',
	function($scope, $stateParams, $location, Surveys, Questions) {
		
		$scope.inputResult = function() {
            var survey = $scope.survey;
            var ansA = survey.surveyAnsA;
            var ansB = survey.surveyAnsB;
            if($scope.surveyAns1 == 1)
            {
                survey.surveyQ1AnsA++;
            }
            else if($scope.surveyAns1 == 2)
            {
                survey.surveyQ1AnsB++;
            }
			if($scope.surveyAns2 == 1)
            {
                survey.surveyQ2AnsA++;
            }
            else if($scope.surveyAns2 == 2)
            {
                survey.surveyQ2AnsB++;
            }
			if($scope.surveyAns3 == 1)
            {
                survey.surveyQ3AnsA++;
            }
            else if($scope.surveyAns3 == 2)
            {
                survey.surveyQ3AnsB++;
            }
			if($scope.surveyAns4 == 1)
            {
                survey.surveyQ4AnsA++;
            }
            else if($scope.surveyAns4 == 2)
            {
                survey.surveyQ4AnsB++;
            }
			if($scope.surveyAns5 == 1)
            {
                survey.surveyQ5AnsA++;
            }
            else if($scope.surveyAns5 == 2)
            {
                survey.surveyQ5AnsB++;
            }
            $scope.update();
            //console.log($scope.surveyAnswer);            
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

/* 		$scope.find = function() {
			console.log("find()");
			$scope.question = Questions.query();
		}; */
		
/* 		$scope.findOne = function() {
			$scope.question = Questions.get({
				//questionId: '552c15cca48ec2481635ff9e'
				surveyId: $stateParams.surveyId
			});
			console.log('findOne ' + $stateParams.surveyId);
			console.log($scope.question.title);
		}; */
		$scope.findOne = function() {
			$scope.survey = Surveys.get({
				//questionId: '552c15cca48ec2481635ff9e'
				surveyId: $stateParams.surveyId
			});
			console.log('findOne ' + $stateParams.surveyId);
			//console.log($scope.question.title);
		};
	}
]);


