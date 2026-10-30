({
	userloginhelper : function(component, event, helper) {
        var userid=component.get('v.userid');
        var password=component.get('v.password');
		var action=component.get('c.userloginmethod');
        action.setparams({
            userid:userid,
            password:password
        });
        action.setcallback(this,function(response){
             var state=response.getstate();
             var myresponse=response.getreturnvalue();
        if(component.isValid() && state === "SUCCESS"){
            if(myresponse!= null){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    type:"success",
                    "message": "Login successfull!."
                });
                toastEvent.fire(); 
               /* var urlEvent1 = $A.get("e.force:navigateToURL");
                    urlEvent1.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/mynewcommunity/s/homepage/?Id=' +response.getReturnValue().Id});
                    urlEvent1.fire(); */ 
            } 
        }
    });
    $A.enqueueAction(action);
	}
})