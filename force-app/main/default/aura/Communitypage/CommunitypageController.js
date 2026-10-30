({
	username : function(component, event, helper) {
		helper.LoginUsingUsername(component, event, helper);
	},
    empid : function(component, event, helper) {
		helper.LoginUsingEmpid(component, event, helper);
	},
    saveUser:function(component, event, helper) {
		helper.saveAsloggedUser(component, event, helper);
	},
      saveEmpid:function(component, event, helper) {
		helper.saveAsloggedEmpid(component, event, helper);
	},
})