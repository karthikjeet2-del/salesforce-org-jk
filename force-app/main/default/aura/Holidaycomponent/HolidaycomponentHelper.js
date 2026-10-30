({
  displayHolidayAttachment :function(component){
          var action = component.get("c.fetchAttachment"); 
          action.setCallback(this, function(response) {
            var state = response.getState(); 
            var result = JSON.stringify(response.getReturnValue());
            if (component.isValid() && state === "SUCCESS")
                component.set("v.CommunityURL", "https://mindlinksolution-dev-e-developer-edition.ap24.force.com");
              alert(CommunityURL);
                component.set("v.Attachmentid", response.getReturnValue()); 
        });
        $A.enqueueAction(action);
                }
})