
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    // "sap/ui/model/odata/v4/ODataModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("com.sap.capgemini.project1.controller.View1", {
        onInit: function () {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

            // Use bindList with a valid relative path
            const oBinding = oModel.bindList("/ModuleSRV");
          
            // Request the contexts starting at index 0, requesting 20 records
            oBinding.requestContexts(0, 20).then((aContexts) => {
              const aData = aContexts.map((oContext) => oContext.getObject());
              // Create and assign JSONModel
              const oJSONModel = new sap.ui.model.json.JSONModel(aData);
              this.getView().setModel(oJSONModel, "DropdownModel");
            }).catch((oError) => {
              console.error("Error fetching ModuleSRV data:", oError);
            });


            var oAppModel = new JSONModel({
                selectedModules: []
            });
            this.getView().setModel(oAppModel, "appModel");
          },
          onModuleChange: function (oEvent) {
            var oMultiComboBox = oEvent.getSource();
            var aSelectedKeys = oMultiComboBox.getSelectedKeys();
            console.log("Selected Keys in MultiComboBox:", aSelectedKeys); // Debug
            var oAppModel = this.getView().getModel("appModel");
            oAppModel.setProperty("/selectedModules", aSelectedKeys);
        },
          onExecute:function(){
            debugger;
            var oAppModel = this.getView().getModel("appModel");
            var aSelectedModules = oAppModel.getProperty("/selectedModules");
            if (!aSelectedModules || aSelectedModules.length === 0) {
                MessageToast.show("Please select at least one module.");
                return;
            }
            console.log("Selected Modules:", aSelectedModules); // Debug
            // Encode each module and join with commas
            var sModulesParam = aSelectedModules.map(module => encodeURIComponent(module.trim())).join(",");
            console.log("Encoded Modules Param:", sModulesParam); // Debug


            this.getOwnerComponent().getRouter().navTo("RouteView2",{
              module: sModulesParam
            });
          }
    });
});