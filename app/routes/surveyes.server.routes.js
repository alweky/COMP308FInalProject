'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var surveyes = require('../../app/controllers/surveyes.server.controller');

	// Surveyes Routes
	app.route('/surveyes')
		.get(surveyes.list)
		.post(users.requiresLogin, surveyes.create);

	app.route('/surveyes/:surveyeId')
		.get(surveyes.read)
		.put(users.requiresLogin, surveyes.hasAuthorization, surveyes.update)
		.delete(users.requiresLogin, surveyes.hasAuthorization, surveyes.delete);

	// Finish by binding the Surveye middleware
	app.param('surveyeId', surveyes.surveyeByID);
};
