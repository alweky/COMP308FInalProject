'use strict';

//Setting up route
angular.module('surveyes').config(['$stateProvider',
	function($stateProvider) {
		// Surveyes state routing
		$stateProvider.
		state('listSurveyes', {
			url: '/surveyes',
			templateUrl: 'modules/surveyes/views/list-surveyes.client.view.html'
		}).
		state('createSurveye', {
			url: '/surveyes/create',
			templateUrl: 'modules/surveyes/views/create-surveye.client.view.html'
		}).
		state('viewSurveye', {
			url: '/surveyes/:surveyeId',
			templateUrl: 'modules/surveyes/views/view-surveye.client.view.html'
		}).
		state('editSurveye', {
			url: '/surveyes/:surveyeId/edit',
			templateUrl: 'modules/surveyes/views/edit-surveye.client.view.html'
		});
	}
]);