'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Surveye Schema
 */
var SurveyeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Surveye name',
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

mongoose.model('Surveye', SurveyeSchema);