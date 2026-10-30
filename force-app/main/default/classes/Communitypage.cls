public class Communitypage {
    @AuraEnabled
    public static List<Employee__c> LoginUsingUsernameMethod(string[] userdata){
      string empEmail=userdata[0];
     List<Employee__c> empId=[select Name from Employee__c where Email__c=:empEmail];
     return  empId;
    }
}