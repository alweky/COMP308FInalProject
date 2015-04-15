'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Survey Schema
 */
/* var SurveySchema = new Schema({
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
}); */

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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	numQues: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ1Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ1AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ1AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ2Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ2AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ2AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ3Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ3AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ3AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ4Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ4AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ4AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ5Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ5AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ5AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ6Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ6AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ6AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ7Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ7AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ7AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ8Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ8AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ8AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ9Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ9AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ9AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	surveyQ10Title: {
        type: String,
        default: '',
        trim: true,
		required: 'Title cannot be blank'
    },
    surveyQ10AnsA: {
        type: Number,
        default: 0,
        trim: true
    },
    surveyQ10AnsB: {
        type: Number,
        default: 0,
        trim: true
    },
	active: {
		type: String,
		default: '',
		trim: true,
		required: 'Please choose active or inactive'		
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