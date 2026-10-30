({
	doInit : function(component, event,helper) {
      helper.getAccountDetails(component,event, helper);
    },
    goToAccount:function(component, event, helper) {
        var recordId = component.get("v.acclst").Id;
        //alert(recordId);
       var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": recordId,
                        "slideDevName": "related"
                    });
                    navEvt.fire();
    },
  
})