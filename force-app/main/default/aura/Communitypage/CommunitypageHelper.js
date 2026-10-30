({
    LoginUsingUsername : function(component, event, helper) {
        component.set("v.userlogin",true);
        component.set("v.emplogin",false);
    },
    LoginUsingEmpid : function(component, event, helper) {
        component.set("v.userlogin",false);
        component.set("v.emplogin",true);
    },
    saveAsloggedUser: function(component, event, helper) {
        //alert('inside saveAsloggedUser');
        var action =component.get("c.LoginUsingUsernameMethod");
        action.setParams({
           userdata:component.get("v.userdata"),
        })
        action.setCallback(this, function(response) {
            var state = response.getState();   
            //alert(state);
            var myresponse = response.getReturnValue();
            //alert(state);
           // alert(JSON.stringify(response.getReturnValue()));
            if (component.isValid() && state === "SUCCESS"){
               var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                title: "Success",
                type: "success",
                message: "Login sucessfull"
            });
            toastEvent.fire();
            }
            else{
             var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                title: "Error",
                type: "error",
                message: "Please enter username and password"
            });
            toastEvent.fire();
        }
        });
       $A.enqueueAction(action);
     },
      saveAsloggedEmpid: function(component, event, helper) {
        //alert('inside saveAsloggedEmpid');
        var Employee =component.get("v.empdata");
          if(JSON.stringify(Employee[0])!=null){
            var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                title: "Success",
                type: "success",
                message: "Login sucessfull"
            });
            toastEvent.fire();   
          }
         else{
             var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                title: "Error",
                type: "error",
                message: "Please enter Empid and Token"
            });
            toastEvent.fire();
        
         }}
})