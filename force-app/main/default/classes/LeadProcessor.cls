global class LeadProcessor implements Database.Batchable<sObject>{
    
    global Database.QueryLocator start(database.BatchableContext bc){
        string query ='Select Id,LeadSource  from Lead';
        return Database.getQueryLocator(query);
    }
    global void execute(database.BatchableContext bc,List<Lead> leadList) {
        for(Lead ll : leadList){
            ll.LeadSource='Dreamforce';
        } 
        if(leadList.size()>0){
            database.update(leadList,false);
        }
    }
    global void finish(database.BatchableContext bc){
        system.debug('End');  
    }
}