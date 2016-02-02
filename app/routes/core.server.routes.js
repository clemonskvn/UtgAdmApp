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
    
     // practice post
    app.route('/mypracticepost')
			.post(core.mypracticepost);
    
    // mylastweekpost post
    app.route('/mylastweekpost')
			.post(core.mylastweekpost);
/*    // mybillablepost post
    app.route('/mybillablepost')
			.post(core.mybillablepost);
    // mynonbillablepost post
    app.route('/mynonbillablepost')
			.post(core.mynonbillablepost);
     // Over utilized post
    app.route('/myoverutilpost')
			.post(core.myoverutilpost);
    // myoverbookedpost  post
    app.route('/myoverbookedpost')
			.post(core.myoverbookedpost);*/
   
    // Date range in Utlization
   /* app.route('/mydaterange')
			.post(core.mydaterange);*/
    //Utilization Sql Data
    app.route('/utilization')
		.get(core.utilization);
    //data for last week
    app.route('/lastweek')
		.get(core.lastweek);
    //data for billable resource
    app.route('/usbillable')
		.get(core.usbillable);
    //data for Non billable resource
    app.route('/nonbill')
		.get(core.nonbill);
    //data fro over utilized
    app.route('/overutil')
		.get(core.overutil);
    
    app.route('/utilpractice')
		.get(core.utilpractice);
    
    //Data for location
     app.route('/utilLocation')
		.get(core.utilLocation);
    
    //Data for Overbooked resources
     app.route('/utiloverbooked')
		.get(core.utiloverbooked);
     
     //trigger on Mail click
     app.route('/mailing')
		.get(core.mailing);

};
