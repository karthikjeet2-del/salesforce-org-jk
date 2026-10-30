({
getaccrecords : function(component) {
		var action = component.get("c.getaccrecordstodisplay");
         action.setCallback(this, function(response) {
         //alert(JSON.stringify(response.getReturnValue()));   
         var state = response.getState(); 
         if (component.isValid() && state === "SUCCESS")
             component.set("v.acc", response.getReturnValue());  
        });
        $A.enqueueAction(action);
    }
	
})