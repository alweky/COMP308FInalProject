'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Surveyk = mongoose.model('Surveyk'),
	_ = require('lodash');

/**
 * Create a Surveyk
 */
exports.create = function(req, res) {
	var surveyk = new Surveyk(req.body);
	surveyk.user = req.user;

	surveyk.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveyk);
		}
	});
};

/**
 * Show the current Surveyk
 */
exports.read = function(req, res) {
	res.jsonp(req.surveyk);
};

/**
 * Update a Surveyk
 */
exports.update = function(req, res) {
	var surveyk = req.surveyk ;

	surveyk = _.extend(surveyk , req.body);

	surveyk.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveyk);
		}
	});
};

/**
 * Delete an Surveyk
 */
exports.delete = function(req, res) {
	var surveyk = req.surveyk ;

	surveyk.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveyk);
		}
	});
};

/**
 * List of Surveyks
 */
exports.list = function(req, res) { 
	Surveyk.find().sort('-created').populate('user', 'displayName').exec(function(err, surveyks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(surveyks);
		}
	});
};

/**
 * Surveyk middleware
 */
exports.surveykByID = function(req, res, next, id) { 
	Surveyk.findById(id).populate('user', 'displayName').exec(function(err, surveyk) {
		if (err) return next(err);
		if (! surveyk) return next(new Error('Failed to load Surveyk ' + id));
		req.surveyk = surveyk ;
		next();
	});
};

/**
 * Surveyk authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.surveyk.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
