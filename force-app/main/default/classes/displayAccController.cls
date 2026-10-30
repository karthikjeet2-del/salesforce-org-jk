public class displayAccController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getContactsRelatedToAccount(String accId) {
       return [select id from Account where id in (select AccountId from Contact where id=:accId)]; 
       // return [select id,Contact_No_1__c,Contact_No_2__c,Contact_No_3__c,Contact_No_4__c,Contact_No_5__c,Contact_No_6__c,Contact_No_7__c,Contact_No_8__c,Contact_No_9__c from Book__c where BookId__c=:accId];
        /*List<Account>accDetails=  [select id from Account where id in (select AccountId from Contact where id=:accId)];  
       Id acId=accDetails[0].Id;
       return acId;*/
    }
    @AuraEnabled
    public static List<Account> methodName(){
        try {
            return [select Name,Phone,Accountnumber from Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}