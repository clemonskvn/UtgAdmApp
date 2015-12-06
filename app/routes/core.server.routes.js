'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

	//test server route
	app.route('/mysqltest')
		.get(core.mysqltest);

};
