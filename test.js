var co = require('co');
var yield = require('yield');
var wait = require('wait.for');
var async = require('async');
var await = require('asyncawait/await');


var myv = "test1";

function testing(res,call){
	return call(res);
}


var s = async.series([
    function(callback){
        // do some stuff ...
        var s = "testmycode";
        //callback(null, 'one');
        setTimeout( function(){

			return callback(null,myv);
	 	}, 5000);

    }
    
],
// optional callback
function(err, results){
    // results is now equal to ['one', 'two']
    console.log(results[0]);

    return results;
});

//var sss = 
//console.log(s());
console.log("mytest");
//