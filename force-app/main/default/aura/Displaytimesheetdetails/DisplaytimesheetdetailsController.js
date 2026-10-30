({
    handleClick : function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize =component.get("v.pageSize");
        helper.Timedetails(component,pageNumber, pageSize);
    },
    handleNext: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize =component.get("v.pageSize");
        pageNumber++;
        helper.Timedetails(component, pageNumber, pageSize);
    },
    
    handlePrev: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber");  
        var pageSize = component.get("v.pageSize");
        pageNumber--;
        helper.Timedetails(component, pageNumber, pageSize);
    },
    
    
    
    
})