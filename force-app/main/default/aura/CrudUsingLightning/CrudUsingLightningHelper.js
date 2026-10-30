({
    saveAccountDetails : function(component, event, helper){
        alert('here');
        var accdata=component.get("v.AccData");
        var action =component.get("c.getAccountRecord");
        action.setParams({
            acc:accdata,
        });
        action.setCallback(this, function(result) {
            var state = result.getState();   
            alert(state);
            var myresponse = result.getReturnValue();
            //alert(state);
            alert(JSON.stringify(result.getReturnValue()));
            if (component.isValid() && state === "SUCCESS"){
                if(myresponse != null){
                    //alert('inside success loop');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        type:"success",
                        "message": "Your record is saved."
                    });
                    toastEvent.fire();
                    //component.set('v.acc',result.getReturnValue());
                    component.set("v.insertacc",true);
                    //component.set("v.displayacc",true);
                }
            }
        });
        $A.enqueueAction(action);
    },
    displaydetails:function(component,event,helper) {
        var action = component.get("c.featchdetails");  
        action.setCallback(this, function(result) {
            var state = result.getState();   
            //alert(state);
            var myresponse = result.getReturnValue();
            //alert(state);
            alert(JSON.stringify(result.getReturnValue()));
            if (component.isValid() && state === "SUCCESS"){
                if(myresponse != null){
                     alert('i am here');
                    component.set('v.acc',result.getReturnValue());
                    component.set("v.insertacc",false);
                    // component.set("v.displayacc",false); 
                    component.set("v.showacc",true);
                   component.set("v.selectedCount", 0);
                    component.find("box3").set("v.value", false);
                }
            }
        });
        $A.enqueueAction(action);
    },
    doEdit: function(component,event,helper) {
        //alert('HI edit');
        var selectedMenuItemValue = event.getParam("value");
        var resID = selectedMenuItemValue.replace('_EDIT', '');
        //component.set("v.recId",resID);
        var action = component.get("c.editrecord");
        //alert(resID);
        //  var editRecordEvent = $A.get("e.force:editRecord");
        action.setParams({
            recordempId: resID
        });
        action.setCallback(this, function(respo) {
            var state = respo.getState();
            //alert(state);
            var res= respo.getReturnValue();
            //alert(JSON.stringify(res));
            if(state === "SUCCESS"){
                component.set("v.updatedata",res);
                component.set("v.displayacc",false);
                component.set("v.insertacc",false);
                component.set("v.showacc",false);
                component.set("v.recordform",true);
                //alert('END OF IF LOOP');
            }
        });  
        $A.enqueueAction(action);
    },
    toUpdate: function( component,event,helper) {
        var updateData = component.get("v.updatedata");
        var action= component.get("c.updatedrecord");
        action.setParams({
            ts:updateData          
        });
        action.setCallback(this, function(updateid) {
            var state = updateid.getState();
            // alert(state);
            var res= updateid.getReturnValue();
            // alert(res);
            if(state === "SUCCESS"){
                this.displaydetails(component,event,helper);
                component.set("v.insertacc",false);
                component.set("v.recordform",false);
                // component.set("v.displayacc",false);
                component.set("v.showacc",true);
                //  $A.get('e.force:refreshView').fire();
                //  alert('inside if loop');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    type:"success",
                    "message": "Your record is updated."
                });
                toastEvent.fire();
                //  component.set("v.updatetimesheet",updateid);
                
                
                
            }
        });
        $A.enqueueAction(action);
        
    },
    doDelete: function(component,event,helper) {
        var selectedMenuItemValue = event.getParam("value");
        var idtask = selectedMenuItemValue.replace('_DELETE', '');
        // alert(idtask);
        var action = component.get("c.deleterecord");
        action.setParams({
            "accId":idtask,
        });
        action.setCallback(this, function(r) {
            if(r.getState()==='SUCCESS'){
                this.displaydetails(component,event,helper);
                component.set("v.insertacc",false);
                component.set("v.recordform",false);
                //  component.set("v.displayacc",false); 
                component.set("v.showacc",true);
            } 
            
        });
        $A.enqueueAction(action);
    },
    docancel:function( component,event,helper) {
        component.set("v.insertacc",false);
        // $A.get('e.force:refreshView').fire();
        component.set("v.recordform",false);
        //component.set("v.displayacc",false); 
        component.set("v.showacc",true);
    },
    deleteSelectedHelper:function(component, event, deleteRecordsIds) {
        //call apex class method
        alert('inside helper');
        var action = component.get('c.deleteRecords');
        // pass the all selected record's Id's to apex method 
        action.setParams({
            "lstRecordId": deleteRecordsIds
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            //alert(response.getReturnValue);
            if (state === "SUCCESS") {
                //this.displaydetails(component,event,helper);
                if (response.getReturnValue() != '') {
                    alert(response.getReturnValue());
                    // if getting any error while delete the records , then display a alert msg/
                    alert('The following error has occurred. while Delete record-->' + response.getReturnValue());
                } else {
                    alert('succesfully deleted');
                  
                }
                // call the onLoad function for refresh the List view    
                alert('jj');
                component.set("v.insertacc",false);
                component.set("v.recordform",false);
                //  component.set("v.displayacc",false); 
                component.set("v.showacc",true);
                this.displaydetails(component,event,helper); 
              alert('jj');
                
            }
            
        });
        $A.enqueueAction(action);
    },
    
})