({
    doInit : function(component, event, helper) {
        var value = helper.getParameterByName(component , event, 'Id');
        var action=component.get('c.userloginmethod');
        action.setParams({
            empid:value
        });
        action.setcallback(this,function(response){
            var state=response.getstate();
            var myresponse=response.getreturnvalue();
            if(component.isValid() && state === "SUCCESS"){
                if(myresponse!= null){
                    component.set('v.MyEmployeeId',response.getreturnvalue().Id);
                     component.set('v.Welcomename',response.getreturnvalue().Name);
                }}
                    });
            $A.enqueueAction(action);
    }
})