trigger LeadTrigger on Lead (before insert) {
    
    if(Trigger.isInsert && Trigger.isBefore){
        system.debug('Here My brave hero comes :)');
       // UpdateDuplicateLeadForRize.checkDuplicateLead(Trigger.New); 
    }
}