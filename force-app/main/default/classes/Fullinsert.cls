public class Fullinsert {
   public static Map<id,List<Contact>> maptowrapper(){
       Map<id,List<Contact>> ConAccMap = new Map<id,List<Contact>>();
       set<ID> accIds = new set<ID>();
       for(Account acc:[Select id,Name from account]){
           accIds.add(acc.Id);
       }
       List<contact> contactsList= [Select id,LastName,Account.Name FROM Contact where AccountId In :accIds];
       
       for(Contact contacts:contactsList)
       {
            if(ConAccMap.containsKey(contacts.Account.id))
              {  
               ConAccMap.get(contacts.Account.id).add(contacts);  
              }
           else
              {  
               ConAccMap.put(contacts.Account.id,new list<contact>{contacts});
              }
       }
      //System.debug('ConAccMap>>'+ConAccMap);
       return ConAccMap;
   }
}