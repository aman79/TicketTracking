/**
 * New node file
 */
define(function(require) {

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');

	var empMod = require('models/empModel');
	var empColl = require('collections/empCollection');

	var ticMod = require('models/ticketModel');
	var ticColl = require('collections/ticketCollection');

	var empJson = require('json/empJson');
	var employee = empJson.employees;
	
	var ticJson = require('json/ticketJson');
	var ticket = ticJson.tickets;

	var navTemp = require('text!templates/navBarTemplate.html');

	var logTicketView = require('views/logTicketView');

	var closeTicketView = require('views/closeTicketView');

	var closedTicketView = require('views/closedTicketView');

	var ticketView = require('views/ticketView');

	return Backbone.View.extend({

		el : '#cont',

		events : {
			'click #logTicket' : 'logTicket',
			'click #closeTicket' : 'closeTicket',
			'click #showTicket' : 'showTicket'
		},

		logTicket : function() {
			var logTicket = new logTicketView();
			$("#log").html(logTicket.render().el);

		},

		closeTicket : function() {

			var closeTicket = new closeTicketView();
			$('#log').html(closeTicket.render().el);

		},
		showTicket : function() {
			var closedTicket = new closedTicketView();
			$('#log').html(closedTicket.render().el);
			ticColl.forEach(function(itr) {
				if (itr.get('status')) {
					var ticketsView = new ticketView({
						model : itr
					});
					$("#closedticket").append(ticketsView.render().el);
				}
			});
		},
		render : function() {

			var CompileTemp = _.template(navTemp);
			$('#mainTemp').html(CompileTemp);

			this.onload();
			console.log(empColl);
			return this;

		},
		onload : function() {
			empColl.fetch({
				reset : true
			});
			
			ticColl.fetch({
				reset : true
			});
			if (empColl.length === 0) {
				_.each(employee, function(e) {
					var emp = new empMod(e);
					empColl.create(emp);
				});
			}
			if (ticColl.length === 0) {
				_.each(ticket, function(e) {
					var tic = new ticMod(e);
					ticColl.create(tic);
				});
			}
		}
	});
});