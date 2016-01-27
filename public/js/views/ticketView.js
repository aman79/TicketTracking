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
	tagName : 'tr',
	
	render : function(){
		var tickTemp = require('text!templates/ticketsTemplate.html');
		var CompiledTemp = _.template(tickTemp);
		var json= this.model.toJSON();
		var closing=new Date(json.resolved_date);
		var raised = new Date(json.raised_date);
		var date=this.calcDate(closing,raised);
		json.resolved_date=date;
		this.$el.html(CompiledTemp({
			'user' : json
		}));
		return this;
	},
	calcDate : function(date1, date2) {
		var diff = Math.floor(date1.getTime() - date2.getTime());
		
		var second = 1000;
		var seconds = diff / second;
		var numdays=Math.floor(seconds/86400);
		var numhours=Math.floor((seconds%86400)/3600);
		var numminutes=Math.floor(((seconds%86400)%3600)/60);
		var numseconds=((seconds%86400)%3600)%60;
		var message = "";
		if (numdays < 1) {
			if (numhours < 1) {
				if (numminutes < 1) {
					message += numseconds + " Second ";
				} else {
					message += numminutes + " Minute "+numseconds+"Seconds";
				}
			} else {
				message += numhours + " Hours"+numminutes + " Minutes "+numseconds+"Seconds";
			}
		}else
			{
				message+=numdays+"days"+numhours + " Hours"+numminutes + " Minutes "+numseconds+"Seconds";
			}
		
		return message;
	}

 });
});