'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Surveye = mongoose.model('Surveye'),
	_ = require('lodash');

/**
 * Create a Surveye
 */
exports.create = function(req, res) {
	var surveye = new Surveye(req.body);
	surveye.user = req.user;

	surveye.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveye);
		}
	});
};

/**
 * Show the current Surveye
 */
exports.read = function(req, res) {
	res.jsonp(req.surveye);
};

/**
 * Update a Surveye
 */
exports.update = function(req, res) {
	var surveye = req.surveye ;

	surveye = _.extend(surveye , req.body);

	surveye.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveye);
		}
	});
};

/**
 * Delete an Surveye
 */
exports.delete = function(req, res) {
	var surveye = req.surveye ;

	surveye.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveye);
		}
	});
};

/**
 * List of Surveyes
 */
exports.list = function(req, res) { 
	Surveye.find().sort('-created').populate('user', 'displayName').exec(function(err, surveyes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveyes);
		}
	});
};

/**
 * Surveye middleware
 */
exports.surveyeByID = function(req, res, next, id) { 
	Surveye.findById(id).populate('user', 'displayName').exec(function(err, surveye) {
		if (err) return next(err);
		if (! surveye) return next(new Error('Failed to load Surveye ' + id));
		req.surveye = surveye ;
		next();
	});
};

/**
 * Surveye authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.surveye.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
