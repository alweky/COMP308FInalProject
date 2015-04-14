'use strict';

//Surveys service used for communicating with the surveys REST endpoints
angular.module('surveys').factory('Surveys', ['$resource',
	function($resource) {
		return $resource('surveys/:surveyId', {
			surveyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('questions/:questionId', {
			questionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('surveysQuestion').factory('Questions', ['$resource',
	function($resource) {
		return $resource('public/:surveyId', {
			surveyId: '@surveyId'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);