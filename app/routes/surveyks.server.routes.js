'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var surveyks = require('../../app/controllers/surveyks.server.controller');

	// Surveyks Routes
	app.route('/surveyks')
		.get(surveyks.list)
		.post(users.requiresLogin, surveyks.create);

	app.route('/surveyks/:surveykId')
		.get(surveyks.read)
		.put(users.requiresLogin, surveyks.hasAuthorization, surveyks.update)
		.delete(users.requiresLogin, surveyks.hasAuthorization, surveyks.delete);

	// Finish by binding the Surveyk middleware
	app.param('surveykId', surveyks.surveykByID);
};
