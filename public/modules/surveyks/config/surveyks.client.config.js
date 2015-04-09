'use strict';

// Configuring the Articles module
angular.module('surveyks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Surveyks', 'surveyks', 'dropdown', '/surveyks(/create)?');
		Menus.addSubMenuItem('topbar', 'surveyks', 'List Surveyks', 'surveyks');
		Menus.addSubMenuItem('topbar', 'surveyks', 'New Surveyk', 'surveyks/create');
	}
]);