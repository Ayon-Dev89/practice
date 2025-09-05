sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/m/MessageToast", "satya/prasad/mvcapp/utilities/utilities",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel"
	],
	function(Controller, utilities, Filter, FilterOperator, JSONModel) {
		"use strict";
		return Controller.extend("satya.prasad.mvcapp.controller.List", {
			variable: utilities,
			onInit: function() {
				var oModel = new JSONModel();
				oModel.setData({
					Total: 0,
					Ok: 0,
					Heavy: 0,
					Overweight: 0
				});

				this.getView().setModel(oModel, "viewModel");
				this._onUpdateFinished();
			},
			onSearch: function(oEvent) {
				var sQuery = oEvent.getParameter("query");
				var oTable = this.getView().byId("idTable");

				var oBinding = oTable.getBinding("items");
				var aFilter = [];

				aFilter.push(new Filter(
					[new Filter("ProductID", FilterOperator.Contains, sQuery), new Filter("Category", FilterOperator.Contains, sQuery)],
					false

				));

				oBinding.filter(aFilter);
			},
			onListItemPress: function(oEvent) {
				/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);*/
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("listDetail", {
					ID: oEvent.getSource().getBindingContextPath().split("'")[1]
				});
			},
			_onUpdateFinished: function(oEvent) {
				var oViewModel = this.getView().getModel("viewModel");
				var oDataModel = this.getOwnerComponent().getModel("ODATA");

				oDataModel.read("/ProductSet/$count", {

					success: function(oData) {
						oViewModel.setProperty("/Total", oData);
					}
				});

				oDataModel.read("/ProductSet/$count", {
					filters: [new Filter("WeightMeasure", "LT", "1")],
					success: function(oData) {
						oViewModel.setProperty("/Ok", oData);
					}
				});

				oDataModel.read("/ProductSet/$count", {
					filters: [new Filter("WeightMeasure", "LT", "5")],
					success: function(oData) {
						oViewModel.setProperty("/Heavy", oData);
					}
				});

				oDataModel.read("/ProductSet/$count", {
					filters: [new Filter("WeightMeasure", "GT", "5")],
					success: function(oData) {
						oViewModel.setProperty("/Overweight", oData);
					}
				});

			},
			onFilterSelect:function(oEvent){
				var oBinding = this.getView().byId("idTable").getBinding("items");
				
				var sKey = oEvent.getParameter("key");
				
				if( sKey === "Ok" ){
					oBinding.filter(
						new Filter("WeightMeasure", "LT", "1") );
				} else if( sKey === "Heavy" ){
						oBinding.filter(
						new Filter("WeightMeasure", "LT", "5") );
				} else if( sKey === "Overweight" ){
						oBinding.filter(
						new Filter("WeightMeasure", "GT", "5") );
				}
			}
		});

	});