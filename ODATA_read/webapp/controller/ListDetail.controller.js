sap.ui.define(["sap/ui/core/mvc/Controller"],
	function(Controller) {
		"use strict";
		return Controller.extend("satya.prasad.mvcapp.controller.List", {
		onInit:function(){
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("listDetail").attachPatternMatched(this._routeMatched,this);                         
		},
		_routeMatched:function(oEvent){
		var sPath = "ODATA>/ProductSet('"	+ oEvent.getParameter("arguments").ID + "')";
		this.getView().bindElement(sPath);
		}
		});

	});