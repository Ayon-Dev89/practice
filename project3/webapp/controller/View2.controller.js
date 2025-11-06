
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",

], (Controller,JSONModel,Filter,FilterOperator,MessageToast) => {
    "use strict";
    var ServUrl = '/sap/opu/odata/iwbep/GWSAMPLE_BASIC/';
    var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
    var ProductID;
    return Controller.extend("com.cg.ayon.project3.controller.View2", {
        onInit() {
            var that = this;
            oModel.read("ProductSet?$top=20",null, null, true,
                function(oData){
         debugger;
         var oModel = new JSONModel(oData.results);
         that.getView().setModel(oModel,'MasterModel');
                },)
        },
//         onInit: function () {
//     var that = this;

//     oModel.read("/ProductSet?$top=20", {
//         success: function (oData, response) {
//             debugger;
//             var oJsonModel = new sap.ui.model.json.JSONModel(oData.results);
//             that.getView().setModel(oJsonModel, "MasterModel");
//         },
//         error: function (oError) {
//             console.error("OData Read Error:", oError);
//         }
//     });
// },
      onPreviousPage1 : function(){

              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView1");
        },
        onNextPage2 : function(){

              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView3");

        },


            onSearch: function (oEvent) {
                // add filter for search
                debugger;
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("ProductID", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // // update list binding
                var oList = this.byId("Master");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "MasterModel");
            },
             onThemeSwitch: function (oEvent) {
                var bDark = oEvent.getParameter("state");

                if (bDark) {
                    sap.ui.getCore().applyTheme("sap_fiori_3_dark");
                } else {
                    sap.ui.getCore().applyTheme("sap_fiori_3");
                }
            },



onSave : function(){
    MessageToast.show("Save button pressed ");
},
onDelete : function(){
    MessageToast.show("Delete button pressed ");
},
onMasterPress : function(oEvent){
     var that = this;
                    debugger;
                    ProductID = oEvent.oSource.mProperties.title;
                    oModel.read("/ProductSet(ProductID='"+ProductID+"')?$expand=ToSupplier",null, null, true, 
                        function(oData){
                 debugger;
                 var oModel = new JSONModel(oData);
                 that.getView().setModel(oModel,'FormModel');
                    
            
                    },)

}

                   
    });
});