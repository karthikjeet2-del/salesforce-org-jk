trigger createmeet on EventC__c (after insert) {
if(Trigger.isAfter){
        set<Id> meetingIdset=new Set<Id>();
        for(EventC__c e:trigger.New){
        meetingIdset.add(e.id);
        }
       google.sendRequestmethod(meetingIdset); 
    }
}