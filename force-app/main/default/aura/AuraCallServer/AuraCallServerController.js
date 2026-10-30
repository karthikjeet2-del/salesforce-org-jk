({
    handleClick : function(component, event, helper) {
       
    var action = component.get("c.getDataByName");
    action.setParams({
        name : "Invincible"
    });
    action.setCallback(this,function(response){
     var state = response.getState();
     console.log('state>>'+JSON.stringify(response.getReturnValue()));
     if(state == 'SUCCESS'){
     component.set('v.data',response.getReturnValue().Email__c);
     }else{
     alert('I am here with Error')
     }
    });
    $A.enqueueAction(action);
    }
})