sap.ui.define([
	"sap/base/Log",
	"sap/ui/unified/DateRange",
	"sap/m/MessageToast"

], function (log, DateRange, MessageToast) {
	"use strict";

	return sap.m.Input.extend("App.dataSelect.util.DualCalendar", {

		metadata: {

			properties: {
				showValueHelp: {
					type: "boolean",
					defaultValue: true
				},
				valueHelpOnly: {
					type: "boolean",
					defaultValue: true
				},
				startDate: {
					type: "any"
				},
				endDate: {
					type: "any"
				}
			}

		},

		renderer: {

		},

		onAfterRendering: function () {
			log.info("onAfterRendering");
			this.fireValueHelpRequest({
				fromSuggestions: true
			});
			this._getValueHelpIcon().setSrc("sap-icon://calendar");
		},

		setStartDate: function (oDate) {
			this.setProperty("startDate", oDate, true);
			var oEndDate = this.getProperty("endDate");
			if (oDate === undefined || oEndDate === undefined) {
				return;
			}
			this.setValue(oDate.toLocaleDateString() + " at\u00e9 " + oEndDate.toLocaleDateString());
		},
		setEndDate: function (oDate) {
			this.setProperty("endDate", oDate, true);
			var oStartDate = this.getProperty("startDate");
			if (oDate === undefined || oStartDate === undefined) {
				return;
			}
			this.setValue(oStartDate.toLocaleDateString() + " at\u00e9 " + oDate.toLocaleDateString());
		},

		ontap: function (oEvent) {

			var that = this;

			var oCalBegda = new sap.ui.unified.Calendar("Cal1");
			var oCalEndda = new sap.ui.unified.Calendar("Cal2");

			if (that.getStartDate() !== undefined) {
				oCalBegda.addSelectedDate(new DateRange({
					startDate: that.getStartDate()
				}));
			}
			if (that.getEndDate() !== undefined) {
				oCalEndda.addSelectedDate(new DateRange({
					startDate: that.getEndDate()
				}));
			}


			var oFlexCalendarBeg = new sap.m.VBox("flexCalendarBeg", {
				alignItems: sap.m.FlexAlignItems.Center,
				items: [
					new sap.m.Label("lblBeg", {
						text: "Data in\u00edcio"
					}),
					oCalBegda
				]
			});

			var oFlexCalendarEnd = new sap.m.VBox("flexCalendarEnd", {
				alignItems: sap.m.FlexAlignItems.Center,
				items: [
					new sap.m.Label("lblEnd", {
						text: "Data t\u00e9rmino"
					}),
					oCalEndda
				]
			});

			var oFlexCalendar = new sap.m.HBox("flexCalendar", {
				alignItems: sap.m.FlexAlignItems.Start,
				displayInline: true,
				items: [
					oFlexCalendarBeg,
					oFlexCalendarEnd
				]
			});

			var oDialog = new sap.m.Dialog("dialogCalendar", {
				title: "Calend\u00e1rio",
				icon: "sap-icon://calendar",
				content: [
					oFlexCalendar
				],
				buttons: [
					new sap.m.Button({
						text: "Cancelar",
						type: sap.m.ButtonType.Default,
						press: function () {
							oDialog.close();
						}
					}),
					new sap.m.Button({
						text: "OK",
						type: sap.m.ButtonType.Emphasized,
						press: function () {

							var aStartDate = oCalBegda.getSelectedDates();
							var aEndDate = oCalEndda.getSelectedDates();
							if (aStartDate.length === 0 || aEndDate.length === 0) {
								MessageToast.show("Selecionar per\u00edodo desejado");
								return;
							}

							if (aStartDate[0].getStartDate() > aEndDate[0].getStartDate()) {
								MessageToast.show("Data in\u00edcio posterior a data t\u00e9rmino");
								return;
							}

							that.setStartDate(aStartDate[0].getStartDate());
							that.setEndDate(aEndDate[0].getStartDate());

							oDialog.close();
						}
					})
				],
				afterClose: function () {
					oDialog.destroy();
				}
			});

			oDialog.open();

		}

	});

});