public with sharing class AuraServer {
    
    @AuraEnabled
    public static Account getDataByName(String name){
        try {
            Account acc =  [SELECT Id,Name,Email__c FROM Account WHERE Name =: name];
            system.debug('response>>>>>>.'+acc);
            return acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}