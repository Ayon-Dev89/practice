sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
	"sap/m/MenuItem",
    'sap/ui/model/json/JSONModel'
], (Controller,MessageToast,MenuItem) => {
    "use strict";

    return Controller.extend("com.cg.ayon.project3.controller.View1", {
        onInit() {
        },

        onButtonPress: function(oEvent) {
			var oButton = oEvent.getSource();
			this.byId("actionSheet").openBy(oButton);
		},


        onMenuAction: function(oEvent) {
				var oItem = oEvent.getParameter("item"),
					sItemPath = "";

				while (oItem instanceof MenuItem) {
					sItemPath = oItem.getText() + " > " + sItemPath;
					oItem = oItem.getParent();
				}

				sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));

				MessageToast.show("Action triggered on item: " + sItemPath);
			},

        handleRefresh : function() {
            location.reload();
        },
        onNextPage1 : function(){
            // MessageToast.show("Next Page button pressed ");
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView2");

        },
  



    });
});
