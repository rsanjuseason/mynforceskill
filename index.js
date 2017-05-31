module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
//var express_app = express();
var pg = require('pg');
var app = new alexa.app( 'skill' );

pg.defaults.ssl = true;


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
		"I want to hear you say the number {1-100|number}"]
  },
  function(request,response) {
    //var number = request.slot('number');
    //console.log(process.env.DATABASE_URL);
    //response.say("You asked for the number "+number);
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
    	console.log(process.env.DATABASE_URL);
    	// watch for any connect issues
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        conn.query(
        	'SELECT firstname,lastname,email FROM salesforce.Lead',
        	
        	function(err, result) {
        		done();
        		if (!err) {
        			if(result.rowCount > 0) {
        				//var opp = result.records[0];
        				console.log('this my leads: ' +  result.records[0]);

        				response.say('found leads' );
        			} else{
        				response.say('No lead found');
        			}
        			
        		}else {
        			response.say('Sorry an error occured ');
        		}
    		}
    	);
    	/*conn.query('SELECT firstname,lastname,email FROM salesforce.Lead')
	    .on('row', function(row) {
	      console.log(row[0)
	      console.log(JSON.stringify(row));
	      response.say(JSON.stringify(row));
	    });*/
    });
  }
);

//app.express({ expressApp: express_app });

module.exports = app;