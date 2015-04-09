'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Surveye = mongoose.model('Surveye'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, surveye;

/**
 * Surveye routes tests
 */
describe('Surveye CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Surveye
		user.save(function() {
			surveye = {
				name: 'Surveye Name'
			};

			done();
		});
	});

	it('should be able to save Surveye instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveye
				agent.post('/surveyes')
					.send(surveye)
					.expect(200)
					.end(function(surveyeSaveErr, surveyeSaveRes) {
						// Handle Surveye save error
						if (surveyeSaveErr) done(surveyeSaveErr);

						// Get a list of Surveyes
						agent.get('/surveyes')
							.end(function(surveyesGetErr, surveyesGetRes) {
								// Handle Surveye save error
								if (surveyesGetErr) done(surveyesGetErr);

								// Get Surveyes list
								var surveyes = surveyesGetRes.body;

								// Set assertions
								(surveyes[0].user._id).should.equal(userId);
								(surveyes[0].name).should.match('Surveye Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Surveye instance if not logged in', function(done) {
		agent.post('/surveyes')
			.send(surveye)
			.expect(401)
			.end(function(surveyeSaveErr, surveyeSaveRes) {
				// Call the assertion callback
				done(surveyeSaveErr);
			});
	});

	it('should not be able to save Surveye instance if no name is provided', function(done) {
		// Invalidate name field
		surveye.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveye
				agent.post('/surveyes')
					.send(surveye)
					.expect(400)
					.end(function(surveyeSaveErr, surveyeSaveRes) {
						// Set message assertion
						(surveyeSaveRes.body.message).should.match('Please fill Surveye name');
						
						// Handle Surveye save error
						done(surveyeSaveErr);
					});
			});
	});

	it('should be able to update Surveye instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveye
				agent.post('/surveyes')
					.send(surveye)
					.expect(200)
					.end(function(surveyeSaveErr, surveyeSaveRes) {
						// Handle Surveye save error
						if (surveyeSaveErr) done(surveyeSaveErr);

						// Update Surveye name
						surveye.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Surveye
						agent.put('/surveyes/' + surveyeSaveRes.body._id)
							.send(surveye)
							.expect(200)
							.end(function(surveyeUpdateErr, surveyeUpdateRes) {
								// Handle Surveye update error
								if (surveyeUpdateErr) done(surveyeUpdateErr);

								// Set assertions
								(surveyeUpdateRes.body._id).should.equal(surveyeSaveRes.body._id);
								(surveyeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Surveyes if not signed in', function(done) {
		// Create new Surveye model instance
		var surveyeObj = new Surveye(surveye);

		// Save the Surveye
		surveyeObj.save(function() {
			// Request Surveyes
			request(app).get('/surveyes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Surveye if not signed in', function(done) {
		// Create new Surveye model instance
		var surveyeObj = new Surveye(surveye);

		// Save the Surveye
		surveyeObj.save(function() {
			request(app).get('/surveyes/' + surveyeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', surveye.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Surveye instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveye
				agent.post('/surveyes')
					.send(surveye)
					.expect(200)
					.end(function(surveyeSaveErr, surveyeSaveRes) {
						// Handle Surveye save error
						if (surveyeSaveErr) done(surveyeSaveErr);

						// Delete existing Surveye
						agent.delete('/surveyes/' + surveyeSaveRes.body._id)
							.send(surveye)
							.expect(200)
							.end(function(surveyeDeleteErr, surveyeDeleteRes) {
								// Handle Surveye error error
								if (surveyeDeleteErr) done(surveyeDeleteErr);

								// Set assertions
								(surveyeDeleteRes.body._id).should.equal(surveyeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Surveye instance if not signed in', function(done) {
		// Set Surveye user 
		surveye.user = user;

		// Create new Surveye model instance
		var surveyeObj = new Surveye(surveye);

		// Save the Surveye
		surveyeObj.save(function() {
			// Try deleting Surveye
			request(app).delete('/surveyes/' + surveyeObj._id)
			.expect(401)
			.end(function(surveyeDeleteErr, surveyeDeleteRes) {
				// Set message assertion
				(surveyeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Surveye error error
				done(surveyeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Surveye.remove().exec();
		done();
	});
});