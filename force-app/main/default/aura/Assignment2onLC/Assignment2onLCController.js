({
    save : function(component, event, helper) {
        helper.dosave(component, event, helper);
    },
   handleFilesChange: function (component, event) {
     if(component.find('inputToggle').get('v.checked')==true){
            // alert('inside');
            component.set("v.nextfield",true);
         }
        else{
            component.set("v.nextfield",false);
        }
    }
})