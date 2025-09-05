sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    //   "sap/ui/model/odata/v4/ODataModel"
], (Controller, JSONModel) => {
    "use strict";
    var sModulesParam;
    return Controller.extend("com.cg.ayon.project1.controller.View2", {
        onInit() {

            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
            });
            this.getView().setModel(oModel);

            this.getOwnerComponent().getRouter().getRoute("RouteView2")
                .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            sModulesParam = oEvent.getParameter("arguments").module;
            var aModules = oModel.bindList("/employeesSRV");

            oBinding.requestContexts(0, 100).then(function (aContexts) {
                var aAllData = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });

                var aFiltered = aAllData.filter(function (entry) {
                    return aModules.includes(entry.sapmodule);
                });

                // Set filtered data to MasterModel
                var oJSONModel = new JSONModel(aFiltered);
                this.getView().setModel(oJSONModel, "MasterModel");
            }.bind(this)).catch(function (oError) {
                console.error("Error loading data:", oError);
            });
        },
        filterPressMentor: function (oEvent) {
            let sQuery = oEvent.getParameter("newValue"); //Get entered input text
            let oTable = this.getView().byId("employeeTable");  //Calling the View and Table with ID
            let oBinding = oTable.getBinding("items"); //we are getting the table binding items

            if (sQuery) {
                let oFilter = new sap.ui.model.Filter([
                    new sap.ui.model.Filter("mentor", sap.ui.model.FilterOperator.Contains, sQuery)
                ], false);   //FALSE refers to OR condition operator
                oBinding.filter([oFilter]);  //Apply the filter
            } else {
                oBinding.filter([]); // Clear the filter when input is empty
            }
        },
        filterPressProject: function (oEvent) {
            let sQuery = oEvent.getParameter("newValue"); //Get entered input text
            let oTable = this.getView().byId("employeeTable");  //Calling the View and Table with ID
            let oBinding = oTable.getBinding("items"); //we are getting the table binding items

            if (sQuery) {
                let oFilter = new sap.ui.model.Filter([
                    new sap.ui.model.Filter("project", sap.ui.model.FilterOperator.Contains, sQuery)
                ], false);   //FALSE refers to OR condition operator
                oBinding.filter([oFilter]);  //Apply the filter
            } else {
                oBinding.filter([]); // Clear the filter when input is empty
            }
        },
        filterPressStatus: function (oEvent) {
            let sQuery = oEvent.getParameter("newValue"); //Get entered input text
            let oTable = this.getView().byId("employeeTable");  //Calling the View and Table with ID
            let oBinding = oTable.getBinding("items"); //we are getting the table binding items

            if (sQuery) {
                let oFilter = new sap.ui.model.Filter([
                    new sap.ui.model.Filter("billablestatus", sap.ui.model.FilterOperator.Contains, sQuery)
                ], false);   //FALSE refers to OR condition operator
                oBinding.filter([oFilter]);  //Apply the filter
            } else {
                oBinding.filter([]); // Clear the filter when input is empty
            }
        },
        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        onUpgrade: function (oEvent) {
            const oContext = oEvent.getSource().getBindingContext("MasterModel"); // specify the model name
            if (!oContext) {
                sap.m.MessageBox.error("No binding context found.");
                return;
            }

            const sId = oContext.getProperty("id"); // Make sure 'Id' matches your data property name exactly
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView3", {
                upskillId: sId,
                module: sModulesParam
            });
        }



    });

});