({
    Timedetails : function( component,pageNumber, pageSize) {
        var action = component.get("c.getDetails");
        
        action.setParams({
            d1:component.get("v.startdate"),
            d2:component.get("v.Enddate"),
            pageNumber:pageNumber,
            pageSize:pageSize
        });
        
        action.setCallback(this, function(result) {
            var state = result.getState();
            alert(hii);            
            var resultData = result.getReturnValue();
            if(typeof resultData.pageNumber=="string"){
                alert("ERROR");
            }
            alert(JSON.stringify(response));
            if (component.isValid() && state === "SUCCESS"){
                if(resultData != null){
                    component.set("v.Timesheetdetails",resultData.timeList);
                    component.set("v.PageNumber", resultData.pageNumber);
                    component.set("v.TotalRecords", resultData.totalRecords);
                    component.set("v.RecordStart", resultData.recordStart);
                    component.set("v.RecordEnd", resultData.recordEnd);
                    component.set("v.TotalPages", Math.ceil(resultData.totalRecords / pageSize));
                    component.set("v.showdate",false);
                    component.set("v.displaydata",true);
                    
                    
                }
                else{
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error!",
                        type:"error",
                        "message": "You can view only one month's record."
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    getContactList: function(component, pageNumber, pageSize) {
        var action = component.get("c.getContactData");
        action.setParams({
            "pageNumber": pageNumber,
            "pageSize": pageSize
        });
        action.setCallback(this, function(result) {
            var state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.ContactList", resultData.contactList);
                component.set("v.PageNumber", resultData.pageNumber);
                component.set("v.TotalRecords", resultData.totalRecords);
                
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords / pageSize));
            }
        });
        $A.enqueueAction(action);
    }
    
})