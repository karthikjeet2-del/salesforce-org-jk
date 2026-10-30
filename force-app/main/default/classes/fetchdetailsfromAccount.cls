public class fetchdetailsfromAccount {
    @AuraEnabled
    public static List<Account> getAccountRecord(Account acc,contact con)
    { 
        
         acc.Email__c='jk@gmail.com';
         insert acc;
        Contact ccc=new contact();
        ccc.AccountId=acc.id;
        ccc.LAstNAME=con.LAstNAME;
         ccc.Email=con.Email;
        insert ccc;
        return [select Name,Phone,createddate,(select LastName,Email from contacts)from Account limit 10];
    }
    
   @AuraEnabled
    public static List<Account> accdetails(){
        return [select name,phone,(select LastName,Email from contacts) from Account ];
    }
  
}