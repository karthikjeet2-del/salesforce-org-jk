({
	getaccrecords:function( component ) {
        var action = component.get("c.empdetails");
        action.setCallback(this, function(response) {
         var state = response.getState(); 
         var result = JSON.stringify(response.getReturnValue());
         alert('999999999999999'+result);
         if (component.isValid() && state === "SUCCESS")
             component.set("v.acclst", response.getReturnValue());  
        });
        $A.enqueueAction(action);
    },
    dosave1 : function(component, event, helper){
        var accdata=component.get("v.Employeedata");
        var action =component.get("c.getEmpRecord");
        action.setParams({
            Emp:Employeedata,
         })
      action.setCallback(this, function(result) {
            var state = result.getState();   
            alert(state);
            var myresponse = result.getReturnValue();
            alert(state);
            alert(JSON.stringify(result.getReturnValue()));
            if (component.isValid() && state === "SUCCESS"){
                if(myresponse != null){
                    alert('inside success loop');
                    $A.get('e.force:refreshView').fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    toUpdate: function( component,event,helper) {
        alert('finally23');
        alert('vgf');
        var updateData = component.get("v.updatedata");
        //alert(updateData);
        var action= component.get("c.updatedrecord");
        action.setParams({
            ts:updateData          
        });
        action.setCallback(this, function(updateid) {
            var state = updateid.getState();
            //alert(state);
            var res= updateid.getReturnValue();
            // alert(res);
            if(state === "SUCCESS"){
                this.doInitAgain(component,event,helper);
                component.set("v.displaydetails",true);
                component.set("v.recordform",false);
                //  $A.get('e.force:refreshView').fire();
               }
        });
        $A.enqueueAction(action);
        
    },
})