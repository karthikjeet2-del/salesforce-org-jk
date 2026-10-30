({	
    logoutSession : function(component, event, helper){
        //history.back();
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/mynewcommunity/s/' });
        urlEvent.fire();
        // $A.get('e.force:refreshView').fire();        
    },
   
    onClick : function(component, event, helper){
       
    },
    goToTimesheet:function(component, event, helper){
        var Empid = component.get("v.Employeeid");
        alert('Empid>>'+Empid);
        /*var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/mynewcommunity/s/timesheet/?Id=' + Empid });
        //urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/timesheet/s/leaveapplication/?Id=' + response });
        urlEvent.fire(); */
    },
    goToHoliday:function(component, event, helper){
        var Empid = component.get("v.Employeeid");
        alert('Empid>>'+Empid);
        /*var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/mynewcommunity/s/holiday/?Id=' + Empid });
        //urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/timesheet/s/leaveapplication/?Id=' + response });
        urlEvent.fire(); */
    },
    goToLeave:function(component, event, helper){
        var Empid = component.get("v.Employeeid");
        alert('Empid>>'+Empid);
        /*var urlEvent = $A.get("e.force:navigateToURL");
        //urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/mynewcommunity/s/holiday/?Id=' + Empid });
        urlEvent.setParams({ "url": 'https://mindlinkssolutionpvt-developer-edition.ap24.force.com/timesheet/s/leaveapplication/?Id=' + Empid });
        urlEvent.fire();*/ 
    }
})