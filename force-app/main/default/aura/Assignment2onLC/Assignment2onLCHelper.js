({
	dosave : function(component, event, helper) {
		var fdata=component.get("v.Account1");
        var cdata=component.get("v.contact1");
        var action=component.get("c.isEnabled");
        action.setParams({
            tdata:fdata,
            ccc: cdata
        });
        action.setCallback(this, function(result) {
            var state = result.getState();            
            var response = result.getReturnValue();
          alert(response);
            if (component.isValid() && state === "SUCCESS" && response!= null){
               var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "type":"success",
                    "message": "Your record saved successfully!"
                });
                toastEvent.fire();
                var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": response,
                        "slideDevName": "related"
                    });
                    navEvt.fire();
              }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "type":"error",
                    "message": "Enter details!"
                });
                toastEvent.fire(); 
            }
            
        });
         $A.enqueueAction(action);
    }
   
})