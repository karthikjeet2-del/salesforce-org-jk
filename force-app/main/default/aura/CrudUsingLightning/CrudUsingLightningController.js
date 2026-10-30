({
    save : function(component, event, helper) {
        helper.saveAccountDetails(component, event, helper);
    },
    display : function(component, event, helper) {
        helper.displaydetails(component, event, helper);
    },
    handleMenuSelect: function(component,event,helper) {
        //alert('entry');
        var menuValue = event.detail.menuItem.get("v.accesskey");
        //alert('menuValue ====>> '+menuValue);
        switch(menuValue) {
            case "1": helper.doEdit(component,event,helper); break;
            case "2": helper.doDelete(component,event,helper); break;
        }
    },
    updaterecord : function(component, event, helper) {
        helper.toUpdate(component,event, helper);
    },
    handelcancel:  function(component, event, helper){
        helper.docancel(component, event, helper);
    },
    deleteSelected:function(component, event, helper) {
        alert('here');
        var delId = [];
        // get all checkboxes 
        var getAllId = component.find("boxPack");
        // If the local ID is unique[in single record case], find() returns the component. not array
        if(! Array.isArray(getAllId)){
            if (getAllId.get("v.value") == true) {
                delId.push(getAllId.get("v.text"));
            }
        }else{
            // play a for loop and check every checkbox values 
            // if value is checked(true) then add those Id (store in Text attribute on checkbox) in delId var.
            for (var i = 0; i < getAllId.length; i++) {
                if (getAllId[i].get("v.value") == true) {
                    delId.push(getAllId[i].get("v.text"));
                }
            }
        } 
        alert('here2');
        // call the helper function and pass all selected record id's.    
        helper.deleteSelectedHelper(component, event, delId);
    },
    onRadio: function(component, event) {
        var selected = event.getSource().get("v.text");
        var cbs = document.getElementsByClassName("slds-radio");
            for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
            }
        component.set("v.checkThis", true);
        component.set("v.selectedRecordId", selected);

        alert('hello'+component.get("v.selectedRecordId"));
     }
    
 
    
})