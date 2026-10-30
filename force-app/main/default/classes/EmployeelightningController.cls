public with sharing class EmployeelightningController {

    @AuraEnabled
    public static void s(EmplyeeNew__c emp){
        INSERT emp;
    }
}