public class CaseRoutingBatch implements database.Batchable<sObject>{

    public static database.QueryLocator start(database.BatchableContext bC){
       DateTime currentDate= System.today();
       String query ='Select Id,Customer_Language__c,State__c from case where createddate=Today';
       return database.getQueryLocator(query); 
    }
    
    public static void execute(database.BatchableContext bC, List<Case> caseList){
     System.debug('caseList>>'+caseList); 
        Map<String,SkillBasedRouting__mdt> skillMap = new Map<String,SkillBasedRouting__mdt>();
        for(SkillBasedRouting__mdt skill : [Select id,masterlabel,Language__c from SkillBasedRouting__mdt]){
            skillMap.put(skill.Language__c,skill);
        }
    }
    public static void finish(database.BatchableContext bC){
        
    }
}