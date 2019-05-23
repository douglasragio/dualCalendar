sap.ui.define([
	"sap/base/Log",
	"sap/ui/unified/DateRange",
	"sap/m/MessageToast"

], function (log, DateRange, MessageToast) {
	"use strict";

	return sap.m.Input.extend("App.dataSelect.util.DualCalendar", {

		metadata: {

			properties: { // setter and getter are created behind the scenes,
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
			let oEndDate = this.getProperty("endDate");
			if (oDate === undefined || oEndDate === undefined) {
				return
			};
			this.setValue(oDate.toLocaleDateString() + ' até ' + oEndDate.toLocaleDateString());
		},
		setEndDate: function (oDate) {
			this.setProperty("endDate", oDate, true);
			let oStartDate = this.getProperty("startDate");
			if (oDate === undefined || oStartDate === undefined) {
				return
			};
			this.setValue(oStartDate.toLocaleDateString() + ' até ' + oDate.toLocaleDateString());
		},

		ontap: function (oEvent) {

			var that = this;

			let oCalBegda = new sap.ui.unified.Calendar("Cal1", {
				select: function (oEvent) {},
				cancel: function (oEvent) {},
				startDateChange: function (oEvent) {}
			});

			let oCalEndda = new sap.ui.unified.Calendar("Cal2", {
				select: function (oEvent) {},
				cancel: function (oEvent) {},
				startDateChange: function (oEvent) {}
			});

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

			let oFlexCalendarBeg = new sap.m.VBox("flexCalendarBeg", {
				alignItems: sap.m.FlexAlignItems.Center,
				items: [
					new sap.m.Label("lblBeg", {
						text: "Data in\u00edcio"
					}),
					oCalBegda
				]
			});

			let oFlexCalendarEnd = new sap.m.VBox("flexCalendarEnd", {
				alignItems: sap.m.FlexAlignItems.Center,
				items: [
					new sap.m.Label("lblEnd", {
						text: "Data t\u00e9rmino"
					}),
					oCalEndda
				]
			});

			let oFlexCalendar = new sap.m.HBox("flexCalendar", {
				alignItems: sap.m.FlexAlignItems.Start,
				displayInline: true,
				items: [
					oFlexCalendarBeg,
					oFlexCalendarEnd,
				]
			});

			let oDialog = new sap.m.Dialog("dialogCalendar", {
				title: "Calend\u00e1rio",
				icon: "sap-icon://calendar",
				content: [
					oFlexCalendar
				],
				buttons: [
					new sap.m.Button({
						text: "Cancelar",
						type: sap.m.ButtonType.Default,
						press: function (oEvent) {
							oDialog.close();
						}
					}),
					new sap.m.Button({
						text: "OK",
						type: sap.m.ButtonType.Emphasized,
						press: function (oEvent) {

							let aStartDate = oCalBegda.getSelectedDates();
							let aEndDate = oCalEndda.getSelectedDates();
							if (aStartDate.length === 0 || aEndDate.length === 0) {
								MessageToast.show("Selecionar período desejado");
								return;
							}

							if (aStartDate[0].getStartDate() > aEndDate[0].getStartDate()) {
								MessageToast.show("Data início posterior a data fim");
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