public class k1first {
 public static void insert1(){
        Account c=new Account();
        c.Name='Myname';
        insert c;
        contact c1=new contact();
        c1.Lastname='Rajgopal';
        c1.Title='This is me';
        c1.AccountId=c.Id;
        insert c1;
        system.debug('c1');
        contact c2=new contact();
        c2.Lastname='Karthik';

        insert c2;
        system.debug('c2');
   
 }
   }