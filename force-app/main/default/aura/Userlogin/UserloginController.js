({
	userLogin : function(component, event, helper) {
		var userid=component.get('v.userid');
        var password=component.get('v.password');
        if(userid != undefined||userid != null ){
            alert('i am here');
            if(password != undefined|| password != null){
               var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error",
                    type:"errror",
                    "message": "Please enter valid Username and password."
                });
                toastEvent.fire(); 
            }
        }
        helper.userloginhelper(component, event, helper);
	}
})