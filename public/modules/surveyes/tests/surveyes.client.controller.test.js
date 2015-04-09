'use strict';

(function() {
	// Surveyes Controller Spec
	describe('Surveyes Controller Tests', function() {
		// Initialize global variables
		var SurveyesController,
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

			// Initialize the Surveyes controller.
			SurveyesController = $controller('SurveyesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Surveye object fetched from XHR', inject(function(Surveyes) {
			// Create sample Surveye using the Surveyes service
			var sampleSurveye = new Surveyes({
				name: 'New Surveye'
			});

			// Create a sample Surveyes array that includes the new Surveye
			var sampleSurveyes = [sampleSurveye];

			// Set GET response
			$httpBackend.expectGET('surveyes').respond(sampleSurveyes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.surveyes).toEqualData(sampleSurveyes);
		}));

		it('$scope.findOne() should create an array with one Surveye object fetched from XHR using a surveyeId URL parameter', inject(function(Surveyes) {
			// Define a sample Surveye object
			var sampleSurveye = new Surveyes({
				name: 'New Surveye'
			});

			// Set the URL parameter
			$stateParams.surveyeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/surveyes\/([0-9a-fA-F]{24})$/).respond(sampleSurveye);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.surveye).toEqualData(sampleSurveye);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Surveyes) {
			// Create a sample Surveye object
			var sampleSurveyePostData = new Surveyes({
				name: 'New Surveye'
			});

			// Create a sample Surveye response
			var sampleSurveyeResponse = new Surveyes({
				_id: '525cf20451979dea2c000001',
				name: 'New Surveye'
			});

			// Fixture mock form input values
			scope.name = 'New Surveye';

			// Set POST response
			$httpBackend.expectPOST('surveyes', sampleSurveyePostData).respond(sampleSurveyeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Surveye was created
			expect($location.path()).toBe('/surveyes/' + sampleSurveyeResponse._id);
		}));

		it('$scope.update() should update a valid Surveye', inject(function(Surveyes) {
			// Define a sample Surveye put data
			var sampleSurveyePutData = new Surveyes({
				_id: '525cf20451979dea2c000001',
				name: 'New Surveye'
			});

			// Mock Surveye in scope
			scope.surveye = sampleSurveyePutData;

			// Set PUT response
			$httpBackend.expectPUT(/surveyes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/surveyes/' + sampleSurveyePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid surveyeId and remove the Surveye from the scope', inject(function(Surveyes) {
			// Create new Surveye object
			var sampleSurveye = new Surveyes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Surveyes array and include the Surveye
			scope.surveyes = [sampleSurveye];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/surveyes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSurveye);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.surveyes.length).toBe(0);
		}));
	});
}());