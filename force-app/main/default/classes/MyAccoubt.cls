public class MyAccoubt {
    public static void mymethod(){
        Account a1 = new Account();
        a1.Name= 'MyNamiIsKarthik';
        //insert a1;
        System.debug('a1>>'+a1);
        
        List<Account> MyAccout = [select id,NAme from Account];
        System.debug('MyAccout>>'+MyAccout);
    }
}