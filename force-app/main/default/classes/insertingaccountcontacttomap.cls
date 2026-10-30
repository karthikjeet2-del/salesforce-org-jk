public class insertingaccountcontacttomap {
 public static void start(){
        set<Id> myset=new set<Id>();
        //Account a=new Account();a=[select Id,Name from Account where id='0015g000006Wd86AAC' ];
        for(Account acc:[select Id,Name from Account where id='0015g000006Wd86AAC' ]){
            myset.add(acc.Id);
            System.debug('acc>>'+acc);
        }
       // Contact ca=new Contact();
        //ca=[select id,Lastname from Contact where AccountId =: acc.Id];
        //system.debug('ca>>>>>>'+ca);
        List<Account> accContact = [select id,Name,(select id,LastName from contacts) from Account where id in:myset];
        System.debug('accContact>>'+accContact);
        Map<String,List<String>> ConAcc = new Map<String,List<String>>();
        List<String> contac = new List<String>(); 
        //    Map<Account,List<Contact>> ConAcc= new Map<Account,List<Contact>>();
        for(Account acc:accContact){
            for(Contact con:acc.contacts){
                
                contac.add(con.LastName);
                contac.add(con.id);
                ConAcc.put(acc.Name,contac);
            }
            
        }
        System.debug('ConAcc>>'+ConAcc);
 }}