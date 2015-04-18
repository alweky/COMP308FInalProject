/*
	Kevin Sau Yeung Kam
	Survey Applet
	surveys.client.controller.js
	This the survey controller with the surveyQuestion controller as well.
*/

'use strict';
var surveyid;
var quesNum = 0;
var quesTotal;

angular.module('surveys').controller('SurveysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Surveys', 
	function($scope, $stateParams, $location, Authentication, Surveys) {
		$scope.authentication = Authentication;
			
		$scope.create = function() {
			var survey = new Surveys({
				title: this.title,
				surveyQ1Title: 'Question 1 Title',
				surveyQ2Title: 'Question 2 Title',
				surveyQ3Title: 'Question 3 Title',
				surveyQ4Title: 'Question 4 Title',
				surveyQ5Title: 'Question 5 Title',
				surveyQ6Title: 'Question 6 Title',
				surveyQ7Title: 'Question 7 Title',
				surveyQ8Title: 'Question 8 Title',
				surveyQ9Title: 'Question 9 Title',
				surveyQ10Title: 'Question 10 Title',
				numQues: this.numQues,
				active: this.active
			});
			survey.$save(function(response) {
				$location.path('surveys/' + response._id + '/question');
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
				$location.path('surveys');
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
		
		$scope.resetStats = function(survey) {
			var survey = $scope.survey;
			survey.surveyQ1AnsA = 0;		
			survey.surveyQ2AnsA = 0;
			survey.surveyQ3AnsA = 0;
			survey.surveyQ4AnsA = 0;
			survey.surveyQ5AnsA = 0;
			survey.surveyQ6AnsA = 0;
			survey.surveyQ7AnsA = 0;
			survey.surveyQ8AnsA = 0;
			survey.surveyQ9AnsA = 0;
			survey.surveyQ10AnsA = 0;
			survey.surveyQ1AnsB = 0;	
			survey.surveyQ2AnsB = 0;	
			survey.surveyQ3AnsB = 0;	
			survey.surveyQ4AnsB = 0;	
			survey.surveyQ5AnsB = 0;	
			survey.surveyQ6AnsB = 0;
			survey.surveyQ7AnsB = 0;			
			survey.surveyQ8AnsB = 0;	
			survey.surveyQ9AnsB = 0;	
			survey.surveyQ10AnsB = 0;	
			$scope.update();
		};
	}
]);

/* angular.module('questions').controller('QuestionsController', ['$scope', '$window', '$stateParams', '$location', 'Surveys', 'Questions',
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
]); */

//Used for the Survey input page.
angular.module('surveysQuestion').controller('SurveysQuestionController', ['$scope', '$stateParams', '$location', 'Surveys', 'Questions', 'Authentication',
	function($scope, $stateParams, $location, Surveys, Questions, Authentication) {
		$scope.authentication = Authentication;		
		
		$scope.sendEmail = function() {			
			
			var transporter = nodemailer.createTransport(ses({
			}));
			transporter.sendMail({
				from: 'sender@address',
				to: 'alwekycell@gmail.com',
				subject: 'hello',
				text: 'hello world!'
			});
		}	
		//Inputs the resuts of the survey, could definitley be done in a loop, but will do so in another iteration
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
			if($scope.surveyAns6 == 1)
            {
                survey.surveyQ6AnsA++;
            }
            else if($scope.surveyAns6 == 2)
            {
                survey.surveyQ6AnsB++;
            }
			if($scope.surveyAns7 == 1)
            {
                survey.surveyQ7AnsA++;
            }
            else if($scope.surveyAns7 == 2)
            {
                survey.surveyQ7AnsB++;
            }
			if($scope.surveyAns8 == 1)
            {
                survey.surveyQ8AnsA++;
            }
            else if($scope.surveyAns8 == 2)
            {
                survey.surveyQ8AnsB++;
            }
			if($scope.surveyAns9 == 1)
            {
                survey.surveyQ9AnsA++;
            }
            else if($scope.surveyAns9 == 2)
            {
                survey.surveyQ9AnsB++;
            }
			if($scope.surveyAns10 == 1)
            {
                survey.surveyQ10AnsA++;
            }
            else if($scope.surveyAns10 == 2)
            {
                survey.surveyQ10AnsB++;
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


