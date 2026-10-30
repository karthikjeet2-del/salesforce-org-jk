({
	 selectIndAppoinment : function(component, event, helper) {
        var cmpEvent = component.getEvent("AppointmentEvent");
         alert(cmpEvent);
        cmpEvent.setParams({
            "rowIndex" : component.get('v.itemIndex') ,
            "flag" : "SelectedAppointment",
            "RecordID" : component.get('v.Innerwrapper.Appointment.Id')
        });
       
        cmpEvent.fire();
       
    },
})