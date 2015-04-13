'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	surveys = require('../../app/controllers/surveys.server.controller'),
	question = require('../../app/controllers/question.server.controller');

module.exports = function(app) {
	// Survey Routes
	app.route('/surveys')
		.get(surveys.list)
		.post(users.requiresLogin, surveys.create);

	app.route('/surveys/:surveyId')
		.get(surveys.read)
		.put(surveys.update)
		.delete(users.requiresLogin, surveys.hasAuthorization, surveys.delete);
    
    app.route('/public/:surveyId')
		.get(question.read, question.list)
		.put(question.update);
		
	app.route('/questions')
		.post(question.create)
		.get(question.read)
		.put(question.update);

	// Finish by binding the survey middleware
	app.param('surveyId', surveys.surveyByID);
	app.param('questionId', question.questionByID);
};