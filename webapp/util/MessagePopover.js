sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
	"use strict";
	return Object.extend("MessagePopover", {
		
		constructor: function () {
			this.oMessagePopover = undefined;
		},
		
		createPopover: function(idPopover) {

			const messageTemplate = new sap.m.MessagePopoverItem({
				type: '{type}',
				title: '{title}',
				subtitle: '{subtitle}',
				description: '{description}',
			});

			this.oMessagePopover = new sap.m.MessagePopover({
				items: {
					id: idPopover,
					path: '/',
					template: messageTemplate
				}
			});

			this.resetModel();
		},
		
		addMessage: function(oMessage){
			const viewModel = new sap.ui.model.json.JSONModel();
			this.oMessagePopover.getModel().oData.push(oMessage);
			viewModel.setData(this.oMessagePopover.getModel().oData);
			this.oMessagePopover.setModel(viewModel);
		},
		
		resetModel: function(){
			this.oMessagePopover.setModel(new JSONModel([]));
		}		

	});
});