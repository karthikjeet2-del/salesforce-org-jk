({
    doSave1 : function(component, event, helper){
        var LeaveData = component.get("v.LeaveData");
        alert(JSON.stringify(LeaveData));
        var action= component.get("c.saveLeaveApp");
        alert(JSON.stringify(action));
        action.setParams({
            leave:LeaveData
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            alert(state);
            var respo = response.getReturnValue();
            alert(JSON.stringify(respo));
            if (component.isValid() && state === "SUCCESS"){
                if(respo !=null){
                    /*var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    type:"success",
                    "message": "Record has been inserted successfully."
                });
                toastEvent.fire();*/
                    
                    component.set('v.leave',respo);
                    if(respo.leavesleft__c<respo.AppliedLeaves__c){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Error!",
                            type:"error",
                            "message": "You exceeeded Leave limit."
                        });
                        toastEvent.fire(); 
                    }
                    component.set("v.LeaveInsert",false);
                    
                    alert("hi");
                    component.set("v.LeaveView",true);
                    alert("hello");
                    alert("leave"+leave);
                    
                }
                else{
                    alert("error");
                }
            }
        });
        $A.enqueueAction(action);
    }
    
})