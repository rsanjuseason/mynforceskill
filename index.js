module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
var Promise = require("bluebird");
var pgsync = require('pg-sync');
var client = new pgsync.client();

//var pg = require('pg');
var app = new alexa.app( 'skill' );
//var client = new pg.Client(process.env.DATABASE_URL);

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
		//function getData(){
			
			/*return pg.connectAsync(process.env.DATABASE_URL).spread(function (client,done) {
			    /*if (err) {
			    	console.log("not able to get connection "+ err);
		    	}
			    console.log('Connected to postgres! Getting schemas...');*
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
		    });*/

		    /*pg.connectAsync(process.env.DATABASE_URL).spread(function(connection, release) {
		    	
			        connection.queryAsync("SELECT firstname,lastname,email FROM salesforce.Lead")
			         .then(function(result) {
			            //console.log("rows", result.rows);
			            return result.rows[0].firstname;
			         })
			         .finally(function() {
			            // Creating a superfluous anonymous function cos I am
			            // unsure of your JS skill level
			            release();
			         });
			});

		}
		
		var s = function(){
			setTimeout( function(){
				return getData();
	 		}, 3000)};
		console.log(s());
		response.say("data " + s);
		*/
		
		client.connect(process.env.DATABASE_URL);
		client.begin();
		client.setIsolationLevelSerializable();
		var result = client.query("SELECT firstname,lastname,email FROM salesforce.Lead");
		console.log(result);
		console.log(JSON.stringify(result));
		console.log("got it");
		client.disconnect();
		console.log("closed connection");
			    
	}
);

//app.express({ expressApp: express_app });

module.exports = app;