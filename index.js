module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
var co = require('co');
var Sync = require('sync')

//var rp = require('request-promise');
//var FAADataHelper = require('./faa_data_helper');
//var express_app = express();
var pg = require('pg');
var app = new alexa.app( 'skill' );
var client = new pg.Client(process.env.DATABASE_URL);
//client.connect();

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

		var mydata = "text";
		function getData(callback){
		    pg.connect(process.env.DATABASE_URL, function (err, client,done) {
				
			    if (err) {
			    	
			    	console.log("not able to get connection "+ err);
		   			return err;
		    	}
			    console.log('Connected to postgres! Getting schemas...');

			    client.query(
			    	'SELECT firstname,lastname,email FROM salesforce.Lead',
			    	function(err, result) {
			    		if(err){
			               console.log(err);
			               return err;
			            }
			            done(); 
			            var data = result.rows[0].firstname;
			            
			            return callback(result.rows[0].firstname);
			            
					}
				);

				
		  	});

		}
		response.say( getData(function(data){ console.log('callback return data is: ' + data);return data;}));
		
		
	    
	}
);

//app.express({ expressApp: express_app });

module.exports = app;