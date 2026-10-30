({
	dosave : function(component) {
	      
        var action = component.get("c.saveEmp");
        
        action.setParams({"emp": component.get("v.employeeObj")});
        
        action.setCallback(this, function(response){
            
            var state = response.getState();
            
            if (state === "SUCCESS"){
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Emplooyee record has been inserted successfully."
                });
                toastEvent.fire();
            }
            else {
                //Unknown message display logic.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "UNKOWN!",
                    "message": "Unknown error."
                });
                toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
 }	
	
})