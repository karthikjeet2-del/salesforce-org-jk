public class Leavecontroller {

   @AuraEnabled
   public static List<Leave__c> saveLeaveApp(Leave__c leave){
       insert leave;
       List<Leave__c> list1=[select Name,Employee__c,createdDate,Leave__c.StartDate__c,Leave__c.EndDate__c,Leave__c.Totalleaves__c,Leave__c.leavestaken__c,Leave__c.leavesleft__c,Leave__c.AppliedLeaves__c from Leave__c where id=:'a0D5g0000015rYqEAI'];
 
       return list1;
   }
    public static void method1(){
        Case a=new Case(subject='test');
        insert a;
        User u= [select id,Name,email from user limit 1];
        u.email='karthik241221@gmail.com';
        update u;
}
}