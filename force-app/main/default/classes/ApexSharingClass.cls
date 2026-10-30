public with sharing class ApexSharingClass {
    @AuraEnabled
   public static List<Account> getAccountDetails(){
       List<Account> accountList =[Select id,Name,AccountNumber,Industry from Account];  
       System.debug('accountList>>'+accountList.size());
       return accountList;
     }
}