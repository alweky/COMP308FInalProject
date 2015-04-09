'use strict';

// Configuring the Articles module
angular.module('surveyes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Surveyes', 'surveyes', 'dropdown', '/surveyes(/create)?');
		Menus.addSubMenuItem('topbar', 'surveyes', 'List Surveyes', 'surveyes');
		Menus.addSubMenuItem('topbar', 'surveyes', 'New Surveye', 'surveyes/create');
	}
]);