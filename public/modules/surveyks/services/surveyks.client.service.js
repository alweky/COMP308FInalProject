'use strict';

//Surveyks service used to communicate Surveyks REST endpoints
angular.module('surveyks').factory('Surveyks', ['$resource',
	function($resource) {
		return $resource('surveyks/:surveykId', { surveykId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);