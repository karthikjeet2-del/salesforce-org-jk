public without sharing class lightningemployee {
    @AuraEnabled
    public static EmplyeeNew__c FetchEmp(String empId){
        EmplyeeNew__c Empdata = [select Emp_name__c,Name,Phone__c from EmplyeeNew__c where id=:empId];
        return Empdata;
    }
    
    @AuraEnabled
    public static String InsertEmp(EmplyeeNew__c empdata){
        insert empdata;
        return empdata.id;
    }
    public static void diff(){
        datetime d1= system.today();
        datetime d2= system.today().adddays(2);
    }

}