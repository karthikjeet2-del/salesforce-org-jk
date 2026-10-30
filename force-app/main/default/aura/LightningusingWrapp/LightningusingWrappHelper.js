({
    savedetail : function(component, event, helper) {
        var wrappdata1 = component.get("v.wrappvar");
        var action =  component.get("c.test");
        
        action.setParams({
           wrappdata2:JSON.stringify(wrappdata1)
        });
        action.setCallback(this, function(result) {
            var state = result.getState(); 
              alert('fdudsytutrtw');
            alert(state);
             if(typeof state!="string"){
                alert("gff");
            }
            var myresponse = result.getReturnValue();
            alert(myresponse);
            if (component.isValid() && state === "SUCCESS"){
                if(myresponse != null){
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": myresponse,
                        "slideDevName": "related"
                    });
                    navEvt.fire();
                }
              }
        });
        $A.enqueueAction(action);
    }
})