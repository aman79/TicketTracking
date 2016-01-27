/**
 * New node file
 */
define(function(require){
	var Backbone = require('backbone');
	var ticMod = require('models/ticketModel');
	var localstorage = require('localStorage');
	
	Tickets = Backbone.Collection.extend({
		
		model : ticMod,
		localStorage : new localstorage('Ticket-Details')
	});
	return new Tickets();
});