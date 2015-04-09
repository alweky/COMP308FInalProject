'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Surveyk Schema
 */
var SurveykSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Surveyk name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Surveyk', SurveykSchema);