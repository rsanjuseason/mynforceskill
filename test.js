var co = require('co');
var yield = require('yield');

var myv = "test1";
/*var fn = co.wrap(function* (val) {
  var s = yield [1];
  return s;
});
 
var s = fn(true).then(function (val) {
	console.log(val);
 	return val;
});
*/

function test(callback){
	var s= "test";
	callback(s,myv);
}
var s = test(function(v1,v2){console.log(v1+ " " + v2);
	 v2="chnage";});
//s1 = s();
console.log(s);
console.log(myv);
console.log("mytest");