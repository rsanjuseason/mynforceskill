module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
//var express_app = express();
var pg = require('pg');
var app = new alexa.app( 'skill' );

app.launch( function( request, response ) {
	response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );

app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('saynumber',
	{
		"slots":{"number":"AMAZON.NUMBER"}
		,"utterances":[ 
			"say the number {1-100|number}",
			"give me the number {1-100|number}",
			"tell me the number {1-100|number}",
			"I want to hear you say the number {1-100|number}"
		]
	},
	function(request,response) {

		pg.defaults.ssl = true;
		var number = request.slot('number');
		var leadname = "";
		
		var client = new pg.Client(process.env.DATABASE_URL);
		client.connect();

		var query = client.query('SELECT firstname,lastname,email FROM salesforce.Lead');
		query.on("row", function (row, result) {
		    result.addRow(row);
		});
		query.on("end", function (result) {
		    console.log(JSON.stringify(result.rows, null, "    "));
		    response.say(result.rows[0].firstname);
		    client.end();
		});
		//response.say("You asked for the number "+number);
	    /*pg.connect(process.env.DATABASE_URL, function (err, client,done) {
			
			var rowresult = "Some error Occured";
			//var myresult = "";
			// watch for any connect issues
		    if (err) {
		    	
		    	console.log("not able to get connection "+ err);
       			response.say(err);
	    	}
		    console.log('Connected to postgres! Getting schemas...');

		    client.query(
		    	'SELECT firstname,lastname,email FROM salesforce.Lead',
		    	function(err, result) {
		    		
		    		if(err){
		               console.log(err);
		               response.say(err);
		            }
		            console.log(result.rows[0].firstname);
		            response.say(result.rows[0].firstname);
		            done();

		    		/*if (!err) {
		    			if(result.rowCount > 0) {
		    				//var opp = result.records[0];
		    				//rowresult = "found Leads with " + result.rows[0].firstname
		    				console.log("this my leads:"  +  result.rows[0].firstname);
	    					//return leadname;
		    				response.say("Found Leads with name " + result.rows[0].firstname);
		    			} else{
		    				//rowresult = "No lead found";
		    				response.say("No lead found.");
		    			}
		    			
		    		}else {
		    			//rowresult = "Sorry an error occured";
		    			response.say("Sorry an error occured.");
		    		}
		    		client.end();
		    		response.say("Sorry an error occured.before");///
				}
			);
			/*client.on('end', function(){
				console.log("Client was disconnected.")
				response.say("Sorry an error occured. after");
			});
			
		});*/
	}
);

//app.express({ expressApp: express_app });

module.exports = app;