/**
 * New node file
 */
define(function(require){
	  var Backbone = require('backbone');
	     var empMod = require('models/empModel');
	     var LocalStorage = require('localStorage'); 
	     var Employees = Backbone.Collection.extend({
	           model : empMod,
	           localStorage : new LocalStorage('Emp-details')
	     });
	
	     return new  Employees();
});