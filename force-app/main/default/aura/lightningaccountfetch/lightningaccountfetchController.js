({
    /*doInit : function(component, event, helper) {
      helper.getaccrecords(component, event, helper); 
       },*/
     save : function(component, event, helper) {
        helper.dosave1(component, event, helper);
    },

   
/*   panelOne : function(component, event, helper) {
       //var myvalue =  component.find(aura:id).get("v.value");
        helper.toggleAction(component, event,'panelOne');
    },
    
onRadio: function(component, event) {
        var selected = event.getSource().get("v.text");
    alert(selected);
        var cbs = document.getElementsByClassName("slds-checkbox");
            for (var i = 0; i < cbs.length; i++) {
            cbs[i].checked = false;
            }
        component.set("v.checkThis", true);
        component.set("v.selectedRecordId", selected);

        alert(component.get("v.selectedRecordId"));
     },
    checkboxSelect : function(component, event, helper) {
    var quoteRecId = event.getSource().get("v.id");
    var checkValue = event.getSource().get("v.value");
        alert('quoteRecId<'+quoteRecId);
         alert('checkValue<'+checkValue);

    console.log('Inside checkbox Select-->'+quoteRecId); 
    console.log('Inside checkbox Select checkValue-->'+checkValue); 
    var quotes = component.get("v.listQuotes");
    var resetChecks= [];
    for(var i=0; i<quotes.length; i++){ 
       if (quotes[i].Id !== quoteRecId) {
            component.find(quotes[i].Id).set("v.value", false);
       }
    }

}*/

})