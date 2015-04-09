'use strict';

(function() {
	// Surveyks Controller Spec
	describe('Surveyks Controller Tests', function() {
		// Initialize global variables
		var SurveyksController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Surveyks controller.
			SurveyksController = $controller('SurveyksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Surveyk object fetched from XHR', inject(function(Surveyks) {
			// Create sample Surveyk using the Surveyks service
			var sampleSurveyk = new Surveyks({
				name: 'New Surveyk'
			});

			// Create a sample Surveyks array that includes the new Surveyk
			var sampleSurveyks = [sampleSurveyk];

			// Set GET response
			$httpBackend.expectGET('surveyks').respond(sampleSurveyks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.surveyks).toEqualData(sampleSurveyks);
		}));

		it('$scope.findOne() should create an array with one Surveyk object fetched from XHR using a surveykId URL parameter', inject(function(Surveyks) {
			// Define a sample Surveyk object
			var sampleSurveyk = new Surveyks({
				name: 'New Surveyk'
			});

			// Set the URL parameter
			$stateParams.surveykId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/surveyks\/([0-9a-fA-F]{24})$/).respond(sampleSurveyk);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.surveyk).toEqualData(sampleSurveyk);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Surveyks) {
			// Create a sample Surveyk object
			var sampleSurveykPostData = new Surveyks({
				name: 'New Surveyk'
			});

			// Create a sample Surveyk response
			var sampleSurveykResponse = new Surveyks({
				_id: '525cf20451979dea2c000001',
				name: 'New Surveyk'
			});

			// Fixture mock form input values
			scope.name = 'New Surveyk';

			// Set POST response
			$httpBackend.expectPOST('surveyks', sampleSurveykPostData).respond(sampleSurveykResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Surveyk was created
			expect($location.path()).toBe('/surveyks/' + sampleSurveykResponse._id);
		}));

		it('$scope.update() should update a valid Surveyk', inject(function(Surveyks) {
			// Define a sample Surveyk put data
			var sampleSurveykPutData = new Surveyks({
				_id: '525cf20451979dea2c000001',
				name: 'New Surveyk'
			});

			// Mock Surveyk in scope
			scope.surveyk = sampleSurveykPutData;

			// Set PUT response
			$httpBackend.expectPUT(/surveyks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/surveyks/' + sampleSurveykPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid surveykId and remove the Surveyk from the scope', inject(function(Surveyks) {
			// Create new Surveyk object
			var sampleSurveyk = new Surveyks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Surveyks array and include the Surveyk
			scope.surveyks = [sampleSurveyk];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/surveyks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSurveyk);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.surveyks.length).toBe(0);
		}));
	});
}());