public with sharing class PaginationHandler {
    

    @AuraEnabled(cacheable = true)
    public static List<Account> getData(Integer rowLimit , Integer offSet){
        try {
          return [SELECT Id,Name,Email__c,Industry FROM Account LIMIT :rowLimit OFFSET :offSet];  
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}