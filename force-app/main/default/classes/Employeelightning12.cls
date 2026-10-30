public with sharing class Employeelightning12 {

    @AuraEnabled
    public static void saveEmp(EmplyeeNew__c emp){
        INSERT emp;
    }
}