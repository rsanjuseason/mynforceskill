module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
//var express_app = express();
var pg = require('pg');
var app = new alexa.app( 'skill' );
var client = new pg.Client(process.env.DATABASE_URL);
client.connect();

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

		
		var number = request.slot('number');
		
		getRecord(function(record){
			console.log(record);
			response.say(record);
		});	
	    
	}
);

function getRecord(cb) {
	pg.defaults.ssl = true;
    var resultre = "Sorry an error occured.";
    client.query(
    	'SELECT firstname,lastname,email FROM salesforce.Lead',
    	function(err, result) {
    		done();
    		if (!err) {
    			if(result.rowCount > 0) {
    				//var opp = result.records[0];
    				//rowresult = "found Leads with " + result.rows[0].firstname
    				console.log("this my leads:"  +  result.rows[0].firstname);
					//return leadname;
    				resultre = "Found Leads with name " + result.rows[0].firstname;
    			} else{
    				//rowresult = "No lead found";
    				resultre = "No lead found.";
    			}
    			
    		}else {
    			//rowresult = "Sorry an error occured";
    			resultre = "Sorry an error occured.";
    		}
    		
    		cb(resultre);
    		client.end();
		}
	);
}

//app.express({ expressApp: express_app });

module.exports = app;