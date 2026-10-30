trigger createMeeting on Event (after insert) {
 if(Trigger.isAfter){
        set<Id> meetingIdset=new Set<Id>();
        for(Event e:trigger.New){
        meetingIdset.add(e.id);
        }
       googleMeetRestAPI.sendRequestmethod(meetingIdset); 
    }
}