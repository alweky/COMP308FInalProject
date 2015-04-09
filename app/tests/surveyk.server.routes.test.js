'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Surveyk = mongoose.model('Surveyk'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, surveyk;

/**
 * Surveyk routes tests
 */
describe('Surveyk CRUD tests', function() {
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

		// Save a user to the test db and create new Surveyk
		user.save(function() {
			surveyk = {
				name: 'Surveyk Name'
			};

			done();
		});
	});

	it('should be able to save Surveyk instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveyk
				agent.post('/surveyks')
					.send(surveyk)
					.expect(200)
					.end(function(surveykSaveErr, surveykSaveRes) {
						// Handle Surveyk save error
						if (surveykSaveErr) done(surveykSaveErr);

						// Get a list of Surveyks
						agent.get('/surveyks')
							.end(function(surveyksGetErr, surveyksGetRes) {
								// Handle Surveyk save error
								if (surveyksGetErr) done(surveyksGetErr);

								// Get Surveyks list
								var surveyks = surveyksGetRes.body;

								// Set assertions
								(surveyks[0].user._id).should.equal(userId);
								(surveyks[0].name).should.match('Surveyk Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Surveyk instance if not logged in', function(done) {
		agent.post('/surveyks')
			.send(surveyk)
			.expect(401)
			.end(function(surveykSaveErr, surveykSaveRes) {
				// Call the assertion callback
				done(surveykSaveErr);
			});
	});

	it('should not be able to save Surveyk instance if no name is provided', function(done) {
		// Invalidate name field
		surveyk.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveyk
				agent.post('/surveyks')
					.send(surveyk)
					.expect(400)
					.end(function(surveykSaveErr, surveykSaveRes) {
						// Set message assertion
						(surveykSaveRes.body.message).should.match('Please fill Surveyk name');
						
						// Handle Surveyk save error
						done(surveykSaveErr);
					});
			});
	});

	it('should be able to update Surveyk instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveyk
				agent.post('/surveyks')
					.send(surveyk)
					.expect(200)
					.end(function(surveykSaveErr, surveykSaveRes) {
						// Handle Surveyk save error
						if (surveykSaveErr) done(surveykSaveErr);

						// Update Surveyk name
						surveyk.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Surveyk
						agent.put('/surveyks/' + surveykSaveRes.body._id)
							.send(surveyk)
							.expect(200)
							.end(function(surveykUpdateErr, surveykUpdateRes) {
								// Handle Surveyk update error
								if (surveykUpdateErr) done(surveykUpdateErr);

								// Set assertions
								(surveykUpdateRes.body._id).should.equal(surveykSaveRes.body._id);
								(surveykUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Surveyks if not signed in', function(done) {
		// Create new Surveyk model instance
		var surveykObj = new Surveyk(surveyk);

		// Save the Surveyk
		surveykObj.save(function() {
			// Request Surveyks
			request(app).get('/surveyks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Surveyk if not signed in', function(done) {
		// Create new Surveyk model instance
		var surveykObj = new Surveyk(surveyk);

		// Save the Surveyk
		surveykObj.save(function() {
			request(app).get('/surveyks/' + surveykObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', surveyk.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Surveyk instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Surveyk
				agent.post('/surveyks')
					.send(surveyk)
					.expect(200)
					.end(function(surveykSaveErr, surveykSaveRes) {
						// Handle Surveyk save error
						if (surveykSaveErr) done(surveykSaveErr);

						// Delete existing Surveyk
						agent.delete('/surveyks/' + surveykSaveRes.body._id)
							.send(surveyk)
							.expect(200)
							.end(function(surveykDeleteErr, surveykDeleteRes) {
								// Handle Surveyk error error
								if (surveykDeleteErr) done(surveykDeleteErr);

								// Set assertions
								(surveykDeleteRes.body._id).should.equal(surveykSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Surveyk instance if not signed in', function(done) {
		// Set Surveyk user 
		surveyk.user = user;

		// Create new Surveyk model instance
		var surveykObj = new Surveyk(surveyk);

		// Save the Surveyk
		surveykObj.save(function() {
			// Try deleting Surveyk
			request(app).delete('/surveyks/' + surveykObj._id)
			.expect(401)
			.end(function(surveykDeleteErr, surveykDeleteRes) {
				// Set message assertion
				(surveykDeleteRes.body.message).should.match('User is not logged in');

				// Handle Surveyk error error
				done(surveykDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Surveyk.remove().exec();
		done();
	});
});