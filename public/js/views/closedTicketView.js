/**
 * New node file
 */
define(function(require){
	
	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var empMod = require('models/empModel');
	var empColl = require('collections/empCollection');

	var ticMod = require('models/ticketModel');
	var ticColl = require('collections/ticketCollection');

	var empJson = require('json/empJson');
	var employee = empJson.employees;

	return Backbone.View.extend({
		render : function(){
			var closedTemp = require('text!templates/closedTicketTemp.html');
			var CompiledTemp = _.template(closedTemp);
			this.$el.html(CompiledTemp());
			return this;
		}
		});
});