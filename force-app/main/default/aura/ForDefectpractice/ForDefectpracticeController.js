({
	doInit : function(component, event, helper) {
         alert('here i am');
		 helper.getaccrecords(component); 
	},
    save : function(component, event, helper) {
        helper.dosave1(component, event, helper);
    },
    updaterecord:function(component, event, helper) {
        helper.toUpdate(component, event, helper);
    },
     toCancel:function(component, event, helper) {
       $A.get('e.force:refreshView').fire();
    },
})