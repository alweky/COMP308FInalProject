'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Survey Schema
 */
var SurveySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	numQues: {
		type: Number,
		default: '',
		trim: true
	},
    surveyType: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    surveyAnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyAnsB: {
        type: Number,
        default: 0,
        trim: true
    }
});

/**
 * Question Schema
 */

var QuestionSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	questionNum: {
		type: Number,
		default: 0,
        trim: true
	},
    surveyAnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyAnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyId: {
		type: String,
		default: '',
		trim: true		
	}
});

mongoose.model('Survey', SurveySchema);
mongoose.model('Question', QuestionSchema);