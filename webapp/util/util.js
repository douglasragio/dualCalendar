sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel",
	"sap/base/Log",
	"sap/m/MessageToast"
	
], function (Object, JSONModel, log, MessageToast ) {
	"use strict";
	return Object.extend("Util", {

		constructor: function () {
			//log.error("Classe util");
		},
		
		getUtil: function() {
			//Util
			return new this();
		},


		
		toastInit: function(){
			MessageToast.show("Inicializando App");
		}		

	});
});