({  
       UpdateDocument : function(component,event,Id) {  
     var action = component.get("c.UpdateFiles");  
     var fName = component.find("fileName").get("v.value");  
     alert('File Name'+Id);  
     action.setParams({"documentId":Id,  
              "title": fName,  
              "recordId": component.get("v.recordId")  
              });  
     action.setCallback(this,function(response){  
       var state = response.getState();  
         alert(state);
       if(state=='SUCCESS'){  
         var result = response.getReturnValue();  
         console.log('Result Returned: ' +result);  
         component.find("fileName").set("v.value", " ");  
         component.set("v.files",result);
           this.doInit(component,event,helper);
       }  
     });  
     $A.enqueueAction(action);  
   },  
 })