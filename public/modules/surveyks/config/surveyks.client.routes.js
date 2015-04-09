'use strict';

//Setting up route
angular.module('surveyks').config(['$stateProvider',
	function($stateProvider) {
		// Surveyks state routing
		$stateProvider.
		state('listSurveyks', {
			url: '/surveyks',
			templateUrl: 'modules/surveyks/views/list-surveyks.client.view.html'
		}).
		state('createSurveyk', {
			url: '/surveyks/create',
			templateUrl: 'modules/surveyks/views/create-surveyk.client.view.html'
		}).
		state('viewSurveyk', {
			url: '/surveyks/:surveykId',
			templateUrl: 'modules/surveyks/views/view-surveyk.client.view.html'
		}).
		state('editSurveyk', {
			url: '/surveyks/:surveykId/edit',
			templateUrl: 'modules/surveyks/views/edit-surveyk.client.view.html'
		});
	}
]);