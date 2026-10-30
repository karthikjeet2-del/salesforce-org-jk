({
    saveEmp : function(component, event, helper) {
        var Empdata = component.get("v.employeeObj");
        var action =  component.get("c.InsertEmp");
        action.setParams({
            empdata:Empdata
        });
        action.setCallback(this, function(result) {
            var state = result.getState();            
            var response = result.getReturnValue();
           alert(response);
            if (component.isValid() && state === "SUCCESS"){
               alert(1);
                if(response != null){
                    alert(2);
                    component.set("v.EmpID",response);
                   alert( component.get("v.EmpID"));
                    component.set("v.EmpInsert",false);
                    component.set("v.EmpFetch",true);
                    
                   // 
                }
            }
            
        });
        $A.enqueueAction(action);
    }
})