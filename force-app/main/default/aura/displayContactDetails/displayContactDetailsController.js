({
    /*fetchCons : function(component, event, helper) {
        component.set('v.mycolumns', [
            {label: 'LastName', fieldName: 'LastName', type: 'text'},
            {label: 'AccountName', fieldName: 'Account.Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'text'}            
        ]);
        var action = component.get("c.getContactList");
        action.setCallback(this, function(response){
            component.set("v.conList", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})

({    */    
doInit : function(component, event, helper) {
        component.set('v.mycolumn', [
            {label: 'LastName', fieldName: 'LastName', type: 'text'},
            {label: 'AccountName', fieldName: 'Account.Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'text'}            
        ]);
        var action = component.get("c.getContactList");
        action.setCallback(this, function(response){
            component.set("v.conList", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})