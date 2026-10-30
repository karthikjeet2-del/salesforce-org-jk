public class mapsaccconinsert{
    public static void start(){
        
        List<Account> accContact = [select id,Name,(select id,LastName from contacts) from Account limit 4];
        System.debug('accContact>>'+accContact);
        Map<String,List<String>> ConAcc = new Map<String,List<String>>();
        List<String> contac = new List<String>(); 
        for(Account acc:accContact){
            for(Contact con:acc.contacts){
                contac.add(con.LastName);
                contac.add(con.id);
                ConAcc.put(acc.Name,contac);
            }
        }
        System.debug('ConAcc>>'+ConAcc); 
    }
}