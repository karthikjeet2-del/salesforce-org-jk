public class ContactUniqueIdentifierBatch implements Database.batchable<sObject>{
    
    public database.querylocator start(database.batchableContext bc){
        return database.getQuerylocator('SELECT ID,Email,AccountId FROM Contact');
    }
    
    public void execute(database.batchableContext bc, List<Contact> conList ){
        Set<String> uniqueemailSet = new Set<String>();
        Integer dcc =0;
        Integer ucc = 0;
        Id AccountId;
        map<Id,Account> accMap = new map<Id,Account>();
        MaP<ID,List<CONTACT>> conMap = new MaP<ID,List<CONTACT>>();
        for(Contact con1 : conList){
            if(conMap.containsKey(con1.AccountId)){
                conMap.get(con1.AccountId).add(con1);
            }else{
                conMap.put(con1.AccountId,new List<Contact>{con1});
                
            }
        }
        for(Contact con : conList){
            if( conMap.get(con.AccountId).size()>0){
            system.debug('conMap.get(con.AccountId).size()>'+conMap.get(con.AccountId).size());
            for(Contact groupedCons : conMap.get(con.AccountId)){
                if(groupedCons.email != null){
                if(!uniqueemailSet.contains(groupedCons.email)){
                    ucc+=1;
                    uniqueemailSet.add(groupedCons.email);
                }else{
                    uniqueemailSet.add(groupedCons.email);
                    dcc+=1;
                }
                AccountId = groupedCons.AccountId;
                }
                
            }
            Account acc = new Account();
            acc.Id = AccountId;
            acc.Duplicate_Count__c = dcc;
            acc.Unique_Count__c = ucc;
            accMap.put(acc.Id,acc);
            ucc = 0;
            dcc = 0;
            uniqueemailSet.clear();
            }
            
        }
        system.debug('accMap.values()>>'+accMap.values());
        if(accMap.values().size()>0){
            Database.saveResult[] results = Database.update(accMap.values(),false);
            system.debug('results>>'+results);
        }
    }
    public void finish(Database.batchableContext bc){
    }
    
}