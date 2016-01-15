'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

	//test server route
	app.route('/mysqltest')
		.get(core.mysqltest);
    
    // test post
    app.route('/mysqltestpost')
			.post(core.mysqltestpost);
    
    //Utilization Sql Data
    app.route('/utilization')
		.get(core.utilization);
    

};
