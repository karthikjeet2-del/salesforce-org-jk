public class Nameinsert {
 
   public  void insert1(){
        Account a1 = new Account();
        a1.Name = 'aba';
        insert a1;
        System.debug('a1>>'+a1);
       string s1= a1.Name;
       string s2= s1.reverse()+'1';
        
       Contact c1 = new Contact();
        c1.LastName = s2+'1';
        c1.AccountId = a1.Id;
        insert c1;
        System.debug('c1>>'+c1);
       
        Contact c2 = new Contact();
        c2.LastName = s2+'2';
        c2.AccountId = a1.Id;
        insert c2;
        System.debug('c2>>'+c2);
       
        K2__c k1 = new K2__c();
        k1.Name = c1.LastName+'K';
        k1.Email__c = c1.Id;
       k1.username__c=a1.Name+'1'+'@gmail.com';
        insert k1;
        System.debug('k1>>'+k1);
       
        K2__c k2 = new K2__c();
        k2.Name = c2.LastName+'K';
        k2.Email__c = c2.Id;
        k2.username__c=a1.Name+'2'+'@gmail.com';
        insert k2;
        System.debug('k2>>'+k2);
        
        
       
    }
}