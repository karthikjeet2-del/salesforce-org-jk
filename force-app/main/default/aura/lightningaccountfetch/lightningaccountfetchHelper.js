({
    /* getaccrecords:function( component ) {
        var action = component.get("c.accdetails");
        action.setCallback(this, function(response) {
         var state = response.getState(); 
         var result = JSON.stringify(response.getReturnValue());
         //alert(result);
         if (component.isValid() && state === "SUCCESS")
             component.set("v.acclst", response.getReturnValue());  
        });
        $A.enqueueAction(action);
    },*/
    dosave1 : function(component, event, helper){
        var accdata=component.get("v.AccData");
        var condata=component.get("v.conData");
        var action =component.get("c.getAccountRecord");
        action.setParams({
            acc:accdata,
            con:condata
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
                    var toastEvent = $A.get("e.force:showToast");
                   toastEvent.setParams({
                       "title": "Success!",
                       type:"success",
                       "message": "Your record is saved."
                   });
                   toastEvent.fire();
                    component.set('v.acc',result.getReturnValue());
                    component.set("v.insertacc",false);
                    component.set("v.displayacc",true);
                    
                    
                }
            }
        });
        $A.enqueueAction(action);
    }
  /*  toggleAction : function(component, event, secId) {
        var acc = component.find(secId);
        for(var cmp in acc) {
            $A.util.toggleClass(acc[cmp], 'slds-show');  
            $A.util.toggleClass(acc[cmp], 'slds-hide');  
            
        }
    },
    ,*/

})