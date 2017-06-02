module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
var co = require('co');
var Sync = require('sync')
var async = require('async');
var await = require('asyncawait/await');

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

function asyncWrap(fn) {  
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};


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
	function(request, response) {
	
		var number = request.slot('number');

		var mydata = "text";
		function getData(){
			var close;
			return pg.connectAsync(process.env.DATABASE_URL).spread(function (client,done) {
			    /*if (err) {
			    	console.log("not able to get connection "+ err);
		    	}
			    console.log('Connected to postgres! Getting schemas...');*/
			    close = done;
			    return client.query(
			    	'SELECT firstname,lastname,email FROM salesforce.Lead',
			    	function(err, result) {
			    		if(err){
			               console.log(err);
			            }
			            
			            //back(result.rows[0].firstname);
			            //done(); 
			            return result.rows[0].firstname;
					}
				);

			}).disposer(function() {
		        if (close) close();
		    });

		}

		response.say("data " + getData());
		
		
		
	    
	}
);

//app.express({ expressApp: express_app });

module.exports = app;