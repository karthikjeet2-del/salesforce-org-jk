({
    myAction : function(component, event, helper) {
     var accList = component.get("c.getAccountList");
     accList.setCallback(this, function (response) {
        component.set("v.accList",response.getReturnValue());
    });
    $A.enqueueAction(accList);
    }
})