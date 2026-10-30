public class Accountrelatedcontact {
    public static void accrelatedcon(){
        Map<id,contact> acccon=new Map<id,Contact>();
        List<Account> accdata=[select id,(select id,Lastname from contacts) from account];
        system.debug('accdata>>>>>>>>>'+accdata);
        for(Account acc:accdata){
            for(contact con:acc.contacts){
                acccon.put(acc.id,con);
            }
        }
        system.debug('Accountrelatecontacts>>>>>>'+acccon);
    }

}