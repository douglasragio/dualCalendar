sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"App/dataSelect/util/MessagePopover",
	"App/dataSelect/util/util",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessagePopover, UtilControl, JSONModel) {
	"use strict";

	return Controller.extend("App.dataSelect.controller.App", {

		onInit: function () {

			var mView = new JSONModel();
			mView.setData({
				startDate: new Date(),
				endDate: new Date()
			});
			this.getView().setModel(mView);

			/*			var util = new UtilControl();
						util.toastInit();

						this.oPop = new MessagePopover();
						this.oPop.createPopover("idPop");
						this.oPop.addMessage({
							type: "Error",
							title: "Title1",
							subtitle: "Subtitle1",
							description: "Description1",
							counter: "1"
						});
						this.oPop.addMessage({
							type: "Error",
							title: "Title2",
							subtitle: "Subtitle2",
							description: "Description2",
							counter: "1"
						});*/
			//debugger;

			//var myControl = new DualCalendar({value:"Highlighted editing"});
			//myControl.placeAt("content");

		},
		
		

		_getDialog: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("popoverDate", "App.dataSelect.view.popoverDate", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},

		onValueRequest: function (oEvent) {

			//sap.ui.core.BusyIndicator.show();
			//sap.m.BusyIndicator('gBusi', { busy: true });

			// let oPanel = this.byId("idPanel");
			// oPanel.setBusy(true);

			this.getView().setBusy(true);
			this._getDialog().open();

			// create popover
			// if (!this._oPopover) {
			// 	this._oPopover = sap.ui.xmlfragment("popoverDate", "App.dataSelect.view.popoverDate", this);
			// 	this.getView().addDependent(this._oPopover);
			// }

			// this._oPopover.openBy(oEvent.getSource());		

		},

		onOk: function (oEvent) {
			//this._oPopover.close();
			//sap.ui.core.BusyIndicator.hide();
			this._getDialog().close();
			this.getView().setBusy(false);
			// let oPanel = this.byId("idPanel");
			// oPanel.setBusy(false);

		}

	});
});