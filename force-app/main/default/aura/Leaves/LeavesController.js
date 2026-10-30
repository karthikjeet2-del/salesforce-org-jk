({
     doInit : function(component, event, helper) {
        var today = new Date();
        component.set('v.currentDate', today);
    },
    
    
	doSave : function(component, event, helper) {
		helper.doSave1(component, event, helper)
	},
    view : function(component, event, helper) {
        helper.getRecord(component, event, helper);
	}
})