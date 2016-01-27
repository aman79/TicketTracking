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
	
	var ticketJson = require('json/ticketJson');
	var ticket = ticketJson.tickets;
	
	return Backbone.View.extend({
		
		render : function(){
			var detailsTemp = require('text!templates/detailsTemplate.html');
			var CompiledTemp = _.template(detailsTemp);
			this.$el.html(CompiledTemp({
				user : this.model.toJSON()
			}));
			return this;
		}
	});
});