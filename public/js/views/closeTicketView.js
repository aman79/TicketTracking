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
	return Backbone.View.extend({
		events: {
			'change #closeempselection':'loadDate',
			'click #closeTicket' :'closeTicket',
		},
		
		loadDate : function(){
		var date = new Date();
		$("#txtCloseDateTime").val(date);
		},
		closeTicket : function(){
			var ticketId=$("#ticketselection").val();
			var empId = $("#closeempselection").val();
			var resolvedate = new Date($("#txtCloseDateTime").val()).toISOString().slice(0,19).replace('T',' ');
			var resolveDesc = $("#txtResoDesc").val();
			var updateJson={
					
				"status":true,
				"resolvedby":empId,
				"resolved_date":resolvedate,
				"resolved_desc":resolveDesc
			}
			var newTicket=new ticMod(updateJson);
		ticColl.create(newTicket);
			this.closeView();
		},
		closeView : function(){
			this.remove();
		},
		
		render : function() {
			var closeTemp = require('text!templates/closeTicketTemplate.html');
			var CompiledTemp = _.template(closeTemp);
			var employees = [];
			var count = 0;
			empColl.forEach(function(emp) {
				if (emp.get('dept') == 'ISSD') {
					employees[count] = emp.get('mid');
					count++;
				}
			});
			var tickets = [];
			count = 0;
			ticColl.forEach(function(ticket) {
				if (ticket.get('status') == false) {
					tickets[count] = ticket.get('tid');
					count++;
				}
			});

			this.$el.html(CompiledTemp({
				'employees' : employees,
				'tickets' : tickets
			}));
			return this;
		}
	});
});