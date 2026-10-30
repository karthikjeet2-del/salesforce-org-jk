public class Nameinsert2 {
    public static Map<String,List<String>> insertelement(){
        set<Id> myset=new set<Id>();
        for(Account acc:[select Id,Name from Account ]){
            myset.add(acc.Id);
            System.debug('acc>>'+acc);
        }
        List<Account> accContact = [select id,Name,(select id,Name from contacts) from Account where id in:myset];
        System.debug('accContact'+accContact);
        Map<String,List<String>> ConAcc = new Map<String,List<String>>();
         Map<Account,List<Contact>> ConAcc1 = new Map<Account,List<Contact>>();
        List<String> contac = new List<String>(); 
        for(Account acc:accContact){
            for(Contact con:acc.contacts){
                contac.add(con.Name);
                if(acc.Name == 'karthik'){
                ConAcc.put(acc.Name,contac);
                }
                else{
                    System.debug('error');
                }
            }
        }
        
        System.debug('ConAcc>>'+ConAcc); 
        return ConAcc;
        }}