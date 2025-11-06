sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/Sorter',
    'sap/m/Text',
    'sap/ui/model/FilterOperator',
     'sap/f/LayoutType'],
    (Controller, JSONModel, Filter, Sorter, Text, FilterOperator,LayoutType) => {
        "use strict";
        var ServUrl = '/sap/opu/odata/iwbep/GWSAMPLE_BASIC/';
        var oModel = new sap.ui.model.odata.ODataModel(ServUrl);
        var ProductID;
        return Controller.extend("com.cg.ayon.project3.controller.View3", {
            onInit() {
                var that = this;

                oModel.read("ProductSet", null, null, true,
                    function (oData) {
                        debugger;
                        var oModel = new JSONModel(oData.results);
                        that.getView().setModel(oModel, 'MasterModel');

                        // Extract unique categories from products
                        var aProducts = oData.results;
                        var aUniqueCategories = [...new Set(aProducts.map(item => item.Category))];
                        debugger;
                        var aCategoryObjects = aUniqueCategories.map(function (cat) {
                            return { id: cat, label: cat };
                        });
                        debugger;
                        var oCategoryModel = new JSONModel({ Categories: aCategoryObjects });
                        that.getView().setModel(oCategoryModel, "filterModel");
                    },);
                    var oViewModel = new JSONModel({
                        isFullScreen: false
                    });
                    this.getView().setModel(oViewModel, "DetailView");
 
            },
            onThemeSwitch: function (oEvent) {
                var bDark = oEvent.getParameter("state");

                if (bDark) {
                    sap.ui.getCore().applyTheme("sap_fiori_3_dark");
                } else {
                    sap.ui.getCore().applyTheme("sap_fiori_3");
                }
            },
            onPrevPage: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2");
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
                var oList = this.byId("table");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "MasterModel");
            },
            onSearch1: function (oEvent) {
                // add filter for search
                debugger;
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("Name", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                // // update list binding
                var oList = this.byId("table");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "MasterModel");
            },

            onFilterChange: function () {
                var aSelectedKeys = this.byId("filterBox").getSelectedKeys();
                var oTable = this.byId("table");
                var oBinding = oTable.getBinding("items");

                if (aSelectedKeys.length > 0) {
                    var aFilters = aSelectedKeys.map(function (key) {
                        return new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, key);
                    });
                    oBinding.filter(new sap.ui.model.Filter({ filters: aFilters, and: false }));
                } else {
                    oBinding.filter([]);
                }
            },
            onSortPrice: function () {

                var oTable = this.byId("table"); // Replace with your table ID
                var oBinding = oTable.getBinding("items"); // or "rows" for Grid/Table

                // To get the first set of data :-

                // var aContexts = oBinding.getContexts();
                // if (aContexts.length > 0) {
                // var oFirstItem = aContexts[0].getObject();
                // console.log("First item data:", oFirstItem);
                // }
                var oSorter = new Sorter("Price", false, function (a, b) {
                    return Number(a) - Number(b);
                }); // false = ascending
                oBinding.sort(oSorter);
            },
          onToggleFullScreen: function () {
                var oModel = this.getView().getModel("DetailView");
                var bFull = oModel.getProperty("/isFullScreen");

                var oFCL = this.getView().byId("fcl"); // ✅ direct access from View3

                if (oFCL && typeof oFCL.setLayout === "function") {
                    oFCL.setLayout(bFull ? "TwoColumnsMidExpanded" : "MidColumnFullScreen");
                    oModel.setProperty("/isFullScreen", !bFull);
                } else {
                    console.error("FlexibleColumnLayout not found or invalid.");
                }
                },


            onItemPress: function (oEvent) {
                var that = this;
                debugger;
                // Get the clicked row and its context
                var oListItem = oEvent.getParameter("listItem");
                var oContext = oListItem.getBindingContext("MasterModel");
                if (!oContext) {
                    console.error("No binding context found.");
                    return;
                }
                debugger;
                var oData = oContext.getObject();
                var ProductID = oData.ProductID;

                  // Clear old model first
                // that.getView().setModel(null, "DetailModel");

                // Read Product with Supplier
                debugger;
                oModel.read("/ProductSet(ProductID='" + ProductID + "')?$expand=ToSupplier,ToSalesOrderLineItems", {
                    success: function (oData) {

                        var aOrders = oData.ToSalesOrderLineItems?.results || [];
                        var count = Array.isArray(aOrders) ? aOrders.length : 0;

                         // ✅ Manually update the tab label
                        that.byId("orderItemTab").setText("Items (" + count + ")");

                         var oDetailModel = new JSONModel(oData);
                        that.getView().setModel(oDetailModel, "DetailModel");

                        
                        var oFCL = that.byId("fcl");
                        oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);

                        var oDetailBox = that.byId("detailContent");
                        oDetailBox.removeAllItems();
                        oDetailBox.addItem(new Text({ text: "Product ID: " + oData.ProductID }));
                        oDetailBox.addItem(new Text({ text: "Name: " + oData.Name }));
                        oDetailBox.addItem(new Text({ text: "Category: " + oData.Category }));
                        oDetailBox.addItem(new Text({ text: "Price: ₹" + oData.Price }));
                    },
                    error: function (err) {
                        console.error("Failed to load Product details", err);
                    }
                });
                
            },
            // formatOrderItemCount: function (aItems) {
            //      console.log("Formatter called with:", aItems);
            //     var count = Array.isArray(aItems) ? aItems.length : 0;
            //     return "Items (" + count + ")";
            //     },
            onCloseDetail: function () {
                var oFCL = this.byId("fcl");
                oFCL.setLayout(sap.f.LayoutType.OneColumn);
            },


            onPreviousPage2: function () {
                // MessageToast.show("Next Page button pressed ");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2");
            }

        });
    });