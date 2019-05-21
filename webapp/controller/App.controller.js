sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("App.dataSelect.controller.App", {
		onInit: function () {

		},
		
		onValueRequest: function(oEvent) {
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("popoverDate", "App.dataSelect.view.popoverDate", this);
				this.getView().addDependent(this._oPopover);
			}

			this._oPopover.openBy(oEvent.getSource());			
		},
		
		onOk: function(oEvent) {
			this._oPopover.close();
		}
	
	});
});