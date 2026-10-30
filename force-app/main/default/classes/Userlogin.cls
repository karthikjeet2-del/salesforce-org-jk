public class Userlogin {
    @AuraEnabled
    public static BankAccount__c[] userloginmethod(string userid,string password){
        return [select id,Employee__c,password__c from BankAccount__c where Employee__c=:userid  and password__c=:password];
    }
    @AuraEnabled
    public static BankAccount__c[] userloginmethod(string empid){
        return [select id,Employee__c,password__c from BankAccount__c where id=:empid];
    }
}