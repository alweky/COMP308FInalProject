'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	/*added*/var surveys = require('../../app/controllers/surveys.server.controller');
	app.route('/').get(core.index, surveys.list, surveys.read);
};