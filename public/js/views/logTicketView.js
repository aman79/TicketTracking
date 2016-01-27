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

	var ticketJson = require('json/ticketJson');
	var ticket = ticketJson.tickets;

	//var displayView = require('views/detailsView');

	return Backbone.View
			.extend({

				events : {
					'click #createTicket' : 'bookTicket',
					'change #empSelection' : 'loadData'
				},

				loadData : function() {

					var value = $("#empselection").val();
					var employee = empColl.findWhere({
						'mid' : value
					});
					if (employee != undefined) {
						var empJson = employee.toJSON();
						var template = require('text!templates/detailsTemplate.html');
						var compiledtemplate = _.template(template);
						$("#details").html(compiledtemplate({
							'user' : empJson
						}));
						var date = new Date();
						$("#txtDateTime").val(date);
					}

					/*var display = new displayView({
						model : this.model
					});
					$('#details').html(display.render().el);*/
				},
				bookTicket : function() {
					var severity;
					var radio = document.getElementsByName('choice');
					for (i = 0; i < radio.length; i++) {
						if (radio[i].checked) {
							severity = radio[i].value;
						}
					}
					;

					var Id = $("#empselection").val();
					var desc = $("#txtTicketDesc").val();
					var dateTime = $("#txtDateTime").val();
					var raisedDateTime = $("#txtDateTime").val();
					var json = {

						"severity" : severity,
						"ticket_Desc" : desc,
						"raisedby" : Id,
						"raised_date" : dateTime,
						"status" : false,
						"resolvedby" : "",
						"resolved_date" : "0000-00-00",
						"resolved_desc" : ""
					}
					var ticket = new ticMod(json);
					ticColl.create(ticket);

					this.closeView();
				},

				closeView : function() {
					this.remove();
				},

				render : function() {

					var logTicketTemp = require('text!templates/logTicketTemplate.html');

					var employees = [];
					var count = 0;
					empColl.forEach(function(employee) {
						employees[count] = employee.get('mid');
						count++;
					});

					var CompileTemp = _.template(logTicketTemp);

					this.$el.html(CompileTemp({
						'employees' : employees
					}));
					return this;
				}
			});
});