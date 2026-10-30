public with sharing class RevisionController {
    
    @AuraEnabled
    public static List<Account> getAccountList(){
        try {
           return [SELECT Id,Name,Industry FROM Account Limit 100]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getContactList(){
        try {
            return [SELECT Id,Lastname,AccountId,phone,Account.Name FROM Contact limit 100];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}