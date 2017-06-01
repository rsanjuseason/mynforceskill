module.change_code = 1;
'use strict';

//var express = require("express");
var alexa = require( 'alexa-app' );
var co = require('co');


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
		function* getData(callback){
		//	var mydata;
			
			    pg.connect(process.env.DATABASE_URL, function (err, client,done) {
						var rowresult = "Some error Occured";
					
					    if (err) {
					    	
					    	console.log("not able to get connection "+ err);
				   			return err;
				    	}
					    console.log('Connected to postgres! Getting schemas...');

					    client.query(
					    	'SELECT firstname,lastname,email FROM salesforce.Lead',
					    	function(err, result) {
					    		/*if(err){
					               console.log(err);
					               return err;
					            }*/
					            done(); 
					            var data = result.rows[0].firstname;

					            return data;
					            callback(data);
					            //mydata = result.rows[0].firstname;
					            
					            //return false;
					            //console.log(response);
					            // client.end();
					            
					            
							}
						);

				
		  	});
			

			/*var q = client.query('SELECT firstname,lastname,email FROM salesforce.Lead').bind({mydata:mydata});
			q.on("row", function (row, result) {
				result.addRow(row);
			});
			q.on("end", function (result) {
				response.say(result.rows[0].firstname).send();
				console.log('mydata: '+ mydata);
				return function() {
					var y = [].slice.call(arguments, 0); 
					return fn.apply(context, x.concat(y));
				};
			});*/
			

		}
		var data = getData(function(datas){
				console.log('found data: ' + datas);
				return datas;
			});	
		

		console.log(data);
		response.say(" data ");
		/*response.say(" data " + getData(function(data) { 
			console.log(data);
			var x= data;
			
				 
				return x;
			
		}));*/

		//console.log('--->' + mydata);
		//response.say("connected " + mydata);	
		
	    
	}
);



//app.express({ expressApp: express_app });

module.exports = app;