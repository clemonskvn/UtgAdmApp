'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position, iconClass) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
                iconClass: iconClass || 'fa-laptop',
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);

//Menu service used for getting mysqltest REST
angular.module('core').factory('mysqltest', ['$resource',
	function($resource) {
		return $resource('mysqltest'
		);
	}
]);
// Service for Utlization view
angular.module('core').factory('utilization', ['$resource',
	function($resource) {
		return{
            utilizations: $resource('/utilization', {}, {query:{ method:'GET', isArray: true}}),
            lastweek:$resource('/lastweek', {}, {query:{ method:'GET', isArray: true}}),
            usbillable:$resource('/usbillable', {}, {query:{ method:'GET', isArray: true}}),
            nonbill:$resource('/nonbill', {}, {query:{ method:'GET', isArray: true}}),
            overutil:$resource('/overutil', {}, {query:{ method:'GET', isArray: true}}),
            utilpractice:$resource('/utilpractice', {}, {query:{ method:'GET', isArray: true}}),
            utilLocation:$resource('/utilLocation', {}, {query:{ method:'GET', isArray: true}}),
            utiloverbooked:$resource('/utiloverbooked', {}, {query:{ method:'GET', isArray: true}}),
            nonusbillable:$resource('/usnonbillable', {}, {query:{ method:'GET', isArray: true}})
         
        }
      }
]);
/*
angular.module('core').factory('lastweek', ['$resource',
	function($resource) {
		return $resource('lastweek'
        );
	}
]);
angular.module('core').factory('usbillable', ['$resource',
	function($resource) {
		return $resource('usbillable'
        );
	}
]);
angular.module('core').factory('nonbill', ['$resource',
	function($resource) {
		return $resource('nonbill'
        );
	}
]);
angular.module('core').factory('overutil', ['$resource',
	function($resource) {
		return $resource('overutil'
        );
	}
]);

angular.module('core').factory('utilpractice', ['$resource',
	function($resource) {
		return $resource('utilpractice'
        );
	}
]);

angular.module('core').factory('utilLocation', ['$resource',
	function($resource) {
		return $resource('utilLocation'
        );
	}
]);
angular.module('core').factory('utiloverbooked', ['$resource',
	function($resource) {
		return $resource('utiloverbooked'
        );
	}
                                              
]);
*/

angular.module('core').factory('mailing', ['$resource',
	function($resource) {
		return $resource('mailing'
        );
	}
]);


angular.module('core').factory('mylastweekpost', ['$resource',
	function($resource) {
		return{
            practice:$resource('/mypracticepost', {}, {query:{ method:'POST', isArray: true }}),
            Lastweek: $resource('/mylastweekpost', {}, {query:{ method:'POST', isArray: true }}),
            Billus: $resource('/mybillablepost', {}, {query:{ method:'POST', isArray: true }}),
            Billnonus: $resource('/mynonbillablepost', {}, {query:{ method:'POST', isArray: true }}),
            Overutil: $resource('/myoverutilpost', {}, {query:{ method:'POST', isArray: true }}),
            Overbooked: $resource('/myoverbookedpost', {}, {query:{ method:'POST', isArray: true }}),
            nonBillus: $resource('/mynonusbillablepost', {}, {query:{ method:'POST', isArray: true }})
        }
      }
]);

angular.module('core').factory('getRequest', ['$resource',
	function($resource) {
		return{
            projects: $resource('/getproject', {}, {query:{ method:'GET', isArray: true}}),
            resources: $resource('/getresources', {}, {query:{ method:'GET', isArray: true}}),
            overutil:$resource('/getoverutil', {}, {query:{ method:'GET', isArray: true}}),
            protable:$resource('/protable', {}, {query:{ method:'GET', isArray: true}}),
            progress:$resource('/progress', {}, {query:{ method:'GET', isArray: true}})
            //graph:$resource('/graph', {}, {query:{ method:'GET', isArray: true}})
        }
      }
]);

angular.module('core').factory('postRequest', ['$resource',
	function($resource) {
		return{
            resources: $resource('/postresources', {}, {query:{ method:'POST', isArray: true}}),
            overutil:$resource('/postoverutil', {}, {query:{ method:'POST', isArray: true}}),
            protable:$resource('/postprotable', {}, {query:{ method:'POST', isArray: true}}),
            progress:$resource('/postprogress', {}, {query:{ method:'POST', isArray: true}})
         
        }
      }
]);