'use strict';

// Setting up route
angular.module('surveys').config(['$stateProvider',
	function($stateProvider) {
		// Surveys state routing
		$stateProvider.
		state('listSurveys', {
			url: '/surveys',
			templateUrl: 'modules/surveys/views/list-surveys.client.view.html'
		}).
        state('thankSurveys', {
			url: '/surveys/thankyou',
			templateUrl: 'modules/surveys/views/thanks-survey.client.view.html'
		}).
		state('createSurvey', {
			url: '/surveys/create',
			templateUrl: 'modules/surveys/views/create-survey.client.view.html'
		}).
		state('viewSurvey', {
			url: '/surveys/:surveyId',
			templateUrl: 'modules/surveys/views/view-survey.client.view.html'
		}).
		state('editSurvey', {
			url: '/surveys/:surveyId/edit',
			templateUrl: 'modules/surveys/views/edit-survey.client.view.html'
		}).
		state('statsSurvey', {
			url: '/surveys/:surveyId/stats',
			templateUrl: 'modules/surveys/views/stats-survey.client.view.html'
		}).
		state('questionSurvey', {
			url: '/surveys/:surveyId/question',
			templateUrl: 'modules/surveys/views/create-question-survey.client.view.html'
		}).
		state('publicSurvey', {
			url: '/public/:surveyId',
			templateUrl: 'modules/surveys/views/view-public-survey.client.view.html'
		}).
		state('createQuestion', {
			url: '/questions/:surveyId',
			templateUrl: 'modules/surveys/views/create-question-survey.client.view.html'
		}).
        state('createSurveyQuestion', {
			url: '/surveys/questions',
			templateUrl: 'modules/surveys/views/create-survey-question.client.view.html'
		});
	}
]);