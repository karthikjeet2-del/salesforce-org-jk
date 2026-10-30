public class Mywrapper {
    public void testwrap(){
        wrapAccCon wrap = new wrapAccCon();
        wrap.acc = [select id,name from Account where id =: '0015g000006XeQBAA0'];
       // List<Contact> condetails = [select id,Lastname from Contact where Id =: wrap.acc.Id];
        System.debug('condetails>>'+wrap.acc.Id);
        wrap.con = [select id,Lastname from Contact where AccountId =: wrap.acc.Id];
        //return wrap;
        System.debug('wrap>>'+wrap);
    }
    class wrapAccCon{
        Account acc;
        List<Contact> con;
    }
   /* class WrapConEmail{
        Contact con;
        List<K2__c> emaildata;
    }*/
}