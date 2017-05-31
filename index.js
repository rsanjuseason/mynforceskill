module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
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
    });
  }
);

module.exports = app;