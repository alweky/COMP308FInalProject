'use strict';

//Surveyes service used to communicate Surveyes REST endpoints
angular.module('surveyes').factory('Surveyes', ['$resource',
	function($resource) {
		return $resource('surveyes/:surveyeId', { surveyeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);