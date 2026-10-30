({
   doInit : function(component, event, helper){
       //alert('coming');
       var Empdata = component.get("v.EmpIDhere");
       //alert(Empdata);
       var action = component.get("c.FetchEmp");
       action.setParams({
           empId:Empdata
       });
       action.setCallback(this, function(result) {
           var state = result.getState();            
           var response = result.getReturnValue();
           // alert(JSON.stringify(response));
           if (component.isValid() && state === "SUCCESS"){
               // alert(JSON.stringify(response));
               if(response != null){
                   // alert(JSON.stringify(response));
                   component.set("v.EmpData",response);
                   // alert(JSON.stringify(component.get("v.EmpData")));
               }
           }
       });
       $A.enqueueAction(action);
   }
})