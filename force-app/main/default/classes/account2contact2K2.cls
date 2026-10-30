public class account2contact2K2{
    public  static void insert1(){
        Account a1 = new Account();
        a1.Name = 'Tiger';
        insert a1;
        System.debug('a1>>'+a1);
       
        Contact c1 = new Contact();
        c1.LastName = a1.Name+' '+'is';
        c1.AccountId = a1.Id;
        insert c1;
        System.debug('c1>>'+c1);
       
        Contact c2 = new Contact();
        c2.LastName = a1.Name+'back';
        c2.AccountId = a1.Id;
        insert c2;
        System.debug('c2>>'+c2);
       
        K2__c k1 = new K2__c();
        k1.Name = c1.LastName+'K';
        k1.Email__c = c1.Id;
        insert k1;
        System.debug('k1>>'+k1);  
        }
}