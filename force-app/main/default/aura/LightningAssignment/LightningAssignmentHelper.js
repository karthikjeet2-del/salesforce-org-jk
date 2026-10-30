({
    savedetail : function(component, event, helper) {
        var Adata = component.get("v.Accountobj.Phone");
        if(typeof Adata !="string"){alert('hii');}
        var cdata = component.get("v.Contactobj");
        var action =  component.get("c.Insertdetail");
        
        action.setParams({
            data1:Adata,
            data2:cdata
        });
        action.setCallback(this, function(result) {
            var state = result.getState();   
            alert(state);
            var myresponse = result.getReturnValue();
            alert(state);
            alert(myresponse);
            if (component.isValid() && state === "SUCCESS"){
                if(myresponse != null){
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                        "recordId": myresponse,
                        "slideDevName": "related"
                    });
                    navEvt.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    /*viewdetail: function(component, event, helper) {
        
     var urlEvent = $A.get("e.force:navigateToURL");
     urlEvent.setParams({ "url": 'https://mindlinksolution-dev-ed.lightning.force.com/lightning/r/Account/'+aid+'/view'});
        urlEvent.fire();
     }
    viewdetail : function (component, event, helper) {
        var homeEvent = $A.get("e.force:navigateToObjectHome");
        homeEvent.setParams({
            "scope": "Account"
        });
        homeEvent.fire();
    }*/
})