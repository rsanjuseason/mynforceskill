module.change_code = 1;
'use strict';

var express = require("express");
var alexa = require( 'alexa-app' );

var PORT = process.env.PORT || 8080;
var app = express();

var alexaApp = new alexa.app( 'skill' );

var bodyParser = require('body-parser');
var pg = require('pg');
var express = require("express");

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

alexaApp.launch( function( request, response ) {
	response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


alexaApp.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

alexaApp.intent('sayNumber',
  {
    "slots":{"number":"NUMBER"}
	,"utterances":[ 
		"say the number {1-100|number}",
		"give me the number {1-100|number}",
		"tell me the number {1-100|number}",
		"I want to hear you say the number {1-100|number}"]
  },
  function(request,response) {
    //var number = request.slot('number');
    //response.say("You asked for the number "+number);
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
    	// watch for any connect issues
        if (err) console.log(err);
        conn.query(
        	'SELECT firtname,lastname,email FROM salesforce.Lead',
        	[],
        	function(err, result) {
        		done();
        		if (!err) {
        			if(result.rowCount > 0) {
        				var opp = result.records[0];
        				response.say('Lead name is ' + opp.firstname);
        			} else{
        				response.say('No lead found');
        			}
        			
        		}else {
        			response.say('Sorry an error occured ');
        		}
    		}
    	);
    }
  }
);


app.listen(PORT, () => console.log("Listening on port " + PORT + "."));
module.exports = alexaApp;