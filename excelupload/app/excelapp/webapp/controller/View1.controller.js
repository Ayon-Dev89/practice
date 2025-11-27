sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    "sap/ui/model/json/JSONModel",
    "com/ayon/excelapp/libs/jszip",
    "com/ayon/excelapp/libs/xlsx"
], (Controller,exportLibrary,Spreadsheet,JSONModel,jszip,xlsx) => {
    "use strict";
    var EdmType = exportLibrary.EdmType;
    return Controller.extend("com.ayon.excelapp.controller.View1", {
       onInit() {
         const oModel = new sap.ui.model.odata.v4.ODataModel({
                serviceUrl: "/admin/"
              });
              this.getView().setModel(oModel);
            this.getFunctionData();
        },
        getFunctionData: function()
        {
            debugger;
        var Array = [
            {
            ID :'',
            Name:'',
            Value : ''
            }
        ];
        var oModel = new JSONModel(Array);
        this.getView().setModel(oModel,'TableData');
        // var objed = {
        //     edit: false
        // }
        // var emodel = new sap.ui.model.json.JSONModel(objed);
        // this.getView().setModel(emodel,'EditeModel');
        
        },    
        // Upload Template Data Code 
onUploadExcelFile : function(e)
{
    var that = this;
    that._import(e.getParameter("files") && e.getParameter("files")[0]);

}, 
_import : function (file) {
    var that = this;
    var excelData = {};
    if (file && window.FileReader) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result); // convert ArrayBuffer → Uint8Array

            var workbook = XLSX.read(data, {
                type: 'array'
            });
            // });
            workbook.SheetNames.forEach(function (sheetName) {
                // Here is your object for every sheet in workbook
                excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

            });
             var oModel = new JSONModel(excelData);
             that.getView().setModel(oModel,'TableData');

         };
        reader.onerror = function (ex) {
                    console.log(ex);
                };
                reader.readAsArrayBuffer(file);
            }

},
    // Download Template code
        onDownload: function()
        {
            var aCols, oRowBinding, oSettings, oSheet, oTable;
            if (!this._oTable) {
				this._oTable = this.byId('excelTable');
			}
            oTable = this._oTable;
            oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();


			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Template.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
        },
        createColumnConfig: function()
        {
        	var aCols = [];
            aCols.push({
				label: 'ID',
                property: 'ID',
				type: EdmType.Integer
			});
            aCols.push({
				label: 'Name',
                property: 'Name',
				type: EdmType.String
			});
            aCols.push({
				label: 'Value',
                property: 'Value',
				type: EdmType.Integer
			});
            return aCols;
        },
        //save data into backend
       onUpload : function(){
        var that = this;
        // Get the table data from the JSONModel
    var tableData = this.getView().getModel("TableData").getData();
         if (!tableData || tableData.length === 0) {
        sap.m.MessageToast.show("No data to save!");
        return;
    }
    // Get the OData V4 model you set in onInit
    var oODataModel = this.getView().getModel();

 // Bind to the Records entity set
    var oBinding = oODataModel.bindList("/Records");

    // Loop through each row and create in backend
    tableData.forEach(function(entry) {
        oBinding.create(entry).created().then(function() {
            sap.m.MessageToast.show("Saved record: " + entry.ID);
        }).catch(function(err) {
            sap.m.MessageToast.show("Error saving record: " + entry.ID);
            console.error(err);
        });
    });
}

        });
    });
