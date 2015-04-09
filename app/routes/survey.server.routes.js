'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	surveys = require('../../app/controllers/surveys.server.controller');

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
		.get(surveys.read)
		.put(surveys.update);

	// Finish by binding the survey middleware
	app.param('surveyId', surveys.surveyByID);
};