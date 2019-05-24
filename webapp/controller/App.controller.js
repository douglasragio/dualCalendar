sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("App.dataSelect.controller.App", {

		onInit: function () {

			var mView = new JSONModel();
			mView.setData({
				startDate: undefined,
				endDate: undefined
			});
			
			this.getView().setModel(mView);
		}
		

	});
});