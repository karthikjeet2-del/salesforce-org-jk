({
    getAccountDetails: function(component, pageNumber, pageSize) {
        var action = component.get("c.getAccountdata");
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                //alert(resultData);
                component.set("v.acclst", resultData);
              }
        });
        $A.enqueueAction(action);
    }
})