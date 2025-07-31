sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,JSONModel,MessageToast,MessageBox) => {
    "use strict";
    var sModulesParam;

    return Controller.extend("sapresourcemanagement.controller.View3", {
        onInit() {
            const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);

            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteView3").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            
               const sId = oEvent.getParameter("arguments").upskillId;
               sModulesParam = oEvent.getParameter("arguments").module;
               this.sId = sId;
               const oModel = this.getView().getModel(); // OData model
               const oBinding = oModel.bindList("/zupskills_empSRV");
             
               oBinding.requestContexts(0, 100).then(function (aContexts) {
                 const aFiltered = aContexts
                   .map(ctx => ctx.getObject())
                   .filter(entry => entry.id === sId);
                   
             
                 const oJSONModel = new sap.ui.model.json.JSONModel(aFiltered);
                 this.getView().setModel(oJSONModel, "MasterModel");
               }.bind(this));
   
               //_IDGenTitle2
               var oTitle = this.byId("_IDGenTitle2");
               oTitle.setText("Employee with ID : " + sId);
               console.log(sId);
               
             },
             onBack1:function(){
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2", {
                  module: sModulesParam
                });
    
              },

             formatter: {
                statusColorScheme: function (status) {
                  const pattern1 = /Progress/i;
                  const pattern2 = /completed/i;
    
                  if (pattern1.test(status)) {
                    status = 'In Progress';
                  }else if(pattern2.test(status)){
                    status = 'Completed';
                  }
    
                  switch (status) {
                    case "In Progress":
                      return 5; // Orange
                    case "Completed":
                      return 8; // Green
                    default:
                      return 2; // Gray (Default)
                  }
                }
              },
              onCreate: function () {
                if (!this._oCreateDialog) {
                  this._oCreateDialog = sap.ui.xmlfragment("com.sap.capgemini.project1.view.CreateDialog", this);
                  this.getView().addDependent(this._oCreateDialog);
                }
                sap.ui.getCore().byId("userIdInput").setValue(this.sId);
                
                this._oCreateDialog.open();
              },  
              onCreateConfirm: function () {
              //  const oModel = this.getView().getModel();
              
                const oNewEntry = {
                  id: sap.ui.getCore().byId("userIdInput").getValue(), 
                  trainingid: sap.ui.getCore().byId("trainingIdInput").getValue(),
                  trainingname: sap.ui.getCore().byId("trainingNameInput").getValue(),
                  numberofdays: sap.ui.getCore().byId("daysInput").getValue(),
                  startdate: sap.ui.getCore().byId("startDateInput").getDateValue().toISOString().split("T")[0],
                  completiondate: sap.ui.getCore().byId("completionDateInput").getDateValue().toISOString().split("T")[0],
                  status: sap.ui.getCore().byId("statusInput").getValue()
                };
              
                const oModel = this.getView().getModel();
               
         
                try{
                    oModel.bindList("/Insert_upskillsSRV").create(oNewEntry); 
                    sap.m.MessageToast.show("Entry created successfully");
                    this.clearFields();
                    this._oCreateDialog.close();
                   
                    const oJSONModel = this.getView().getModel("MasterModel");
                    const aData = oJSONModel.getData();
                    aData.push(oNewEntry);
                    oJSONModel.setData(aData);
                }catch(oError){
                    sap.m.MessageBox.error("Failed to create entry: " + oError.message);
                  };
                
              },
              clearFields:function(){
                sap.ui.getCore().byId("userIdInput").setValue(); 
                sap.ui.getCore().byId("trainingIdInput").setValue();
                 sap.ui.getCore().byId("trainingNameInput").setValue();
                 sap.ui.getCore().byId("daysInput").setValue();
                 sap.ui.getCore().byId("startDateInput").setDateValue();
                 sap.ui.getCore().byId("completionDateInput").setDateValue();
                 sap.ui.getCore().byId("statusInput").setValue()
              },
              
              onCreateCancel: function () {
                this._oCreateDialog.close();
              },


              onUpdate:function(){
                //debugger;
                var oTable = this.byId("employeeTable1");
                var aSelectedContexts = oTable.getSelectedContexts("MasterModel");
    
                if (aSelectedContexts.length === 0) {
                    MessageToast.show("Please select a record to edit.");
                    return;
                }
    
                var oSelectedData = aSelectedContexts[0].getObject();
    
                if (!this._oUpdateDialog) {
                  this._oUpdateDialog = sap.ui.xmlfragment("com.sap.capgemini.project1.view.UpdateDialog", this);
                  this.getView().addDependent(this._oUpdateDialog);
                }
                // sap.ui.getCore().byId("_IDGenInput").setValue(this.sId);
                this._oUpdateDialog.open();
    
    
                //********************************************************************* */
               
               sap.ui.getCore().byId("_IDGenInput").setValue(oSelectedData.id); 
                sap.ui.getCore().byId("_IDGenInput1").setValue(oSelectedData.trainingid);
                 sap.ui.getCore().byId("trainingNameInput1").setValue(oSelectedData.trainingname);
                 sap.ui.getCore().byId("daysInput1").setValue(oSelectedData.numberofdays);
                 sap.ui.getCore().byId("startDateInput1").setDateValue(new Date(oSelectedData.startdate));
                 sap.ui.getCore().byId("completionDateInput1").setDateValue(new Date(oSelectedData.completiondate));
                 sap.ui.getCore().byId("statusInput1").setValue(oSelectedData.status);
               
              },

              onUpdateConfirm: function () {
                const oModel = this.getView().getModel(); // OData V4 model
      
                const sId = encodeURIComponent(sap.ui.getCore().byId("_IDGenInput").getValue());
                const sTrainingId = encodeURIComponent(sap.ui.getCore().byId("_IDGenInput1").getValue());
                const sPath = `/Update_upskillsSRV(id='${sId}',trainingid='${sTrainingId}')`;
      
                const oContextBinding = oModel.bindContext(sPath);
                const oContext = oContextBinding.getBoundContext();
      
                // Safety check
                if (!oContext) {
                  MessageToast.show("No context found for update.");
                  return;
                }
      
                // Set updated values via context
                oContext.setProperty("trainingname", sap.ui.getCore().byId("trainingNameInput1").getValue());
                oContext.setProperty("numberofdays", sap.ui.getCore().byId("daysInput1").getValue());
                oContext.setProperty("startdate", sap.ui.getCore().byId("startDateInput1").getDateValue().toISOString().split("T")[0]);
                oContext.setProperty("completiondate", sap.ui.getCore().byId("completionDateInput1").getDateValue().toISOString().split("T")[0]);
                oContext.setProperty("status", sap.ui.getCore().byId("statusInput1").getValue());
      
                oModel.submitBatch("$auto").then(() => {
                  MessageToast.show("Entry updated successfully.");
                  this._oUpdateDialog.close();
      
                   // 🔁 Refresh filtered records into MasterModel
                  const oBinding = oModel.bindList("/zupskills_empSRV");
                  oBinding.requestContexts(0, 100).then((aContexts) => {
                    const aFiltered = aContexts
                      .map(ctx => ctx.getObject())
                      .filter(entry => entry.id === this.sId); // keep your custom filtering
      
                    const oJSONModel = new sap.ui.model.json.JSONModel(aFiltered);
                    this.getView().setModel(oJSONModel, "MasterModel");
                  });
      
      
      
      
                }).catch((err) => {
                  MessageBox.error("Update failed: " + err.message);
                });
              },
      // **********************************************************************************************
                onUpdateCancel:function(){
                  this._oUpdateDialog.close();
                },

                onDelete: function () {
                    const oModel = this.getView().getModel(); // OData V4 model
                    const oJSONModel = this.getView().getModel("MasterModel");
                    const oTable = this.byId("employeeTable1");
                    const aSelectedContexts = oTable.getSelectedContexts("MasterModel");
                  
                    if (aSelectedContexts.length === 0) {
                      MessageToast.show("Please select a record to delete.");
                      return;
                    }
                  
                    const oSelectedData = aSelectedContexts[0].getObject();
                    const sId = encodeURIComponent(oSelectedData.id);
                    const sTrainingId = encodeURIComponent(oSelectedData.trainingid);
                    const sPath = `/Delete_upskillsSRV(id='${sId}',trainingid='${sTrainingId}')`;
                  
                    const oContextBinding = oModel.bindContext(sPath);
                  
                    oContextBinding.requestObject().then(() => {
                      const oContext = oContextBinding.getBoundContext();
                  
                      if (!oContext || typeof oContext.delete !== "function") {
                        MessageToast.show("Record could not be identified for deletion.");
                        return;
                      }
                  
                      MessageBox.confirm("Are you sure you want to delete this entry?", {
                        onClose: (sAction) => {
                          if (sAction === MessageBox.Action.OK) {
                            oContext.delete("$auto").then(() => {
                              MessageToast.show("Record deleted successfully.");
                  
                              // 🔁 Refresh MasterModel with updated backend data
                              const oRefreshBinding = oModel.bindList("/zupskills_empSRV");
                              oRefreshBinding.requestContexts(0, 100).then((aContexts) => {
                                const aFiltered = aContexts
                                  .map(ctx => ctx.getObject())
                                  .filter(entry => entry.id === this.sId); // tweak this filter logic as needed
                  
                                oJSONModel.setData(aFiltered);
                              });
                            }).catch((err) => {
                              MessageBox.error("Deletion failed: " + err.message);
                              console.error("Delete error:", err);
                            });
                          }
                        }
                      });
                    }).catch((err) => {
                      MessageBox.error("Unable to retrieve record from backend.");
                      console.error("Context resolution error:", err);
                    });
                  }
    });
});