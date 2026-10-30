public class contactHandler {
    
    public static void updateNoOfContactsOnRelatedAcc(Map<Id,Contact> contactMap){
        Set<Id> accoiuntIdSet = new Set<Id>();
        Map<Id,Account> accMap = new Map<Id,Account>();
        Integer count =0;
        /*for(Contact con : [Select Id,AccountId from Contact where AccountId in : contactMap.keySet()]){
            if(con.AccountId != null){
            accoiuntIdSet.add(con.AccountId);
             count+= 1;
            }
        }
        for(Id accId : accoiuntIdSet){
            Account acc = new Account();
            acc.Id = accId;
            accList.add(acc);
        }
        database.update(accList, false);*/
        for(Contact con : contactMap.values()){
            accoiuntIdSet.add(con.AccountId);
        }
        for(Contact relatedCons : [Select id,AccountId from Contact where AccountId In: accoiuntIdSet]){
            count += 1;
            Account acc = new Account();
            acc.Id = relatedCons.AccountId;
            acc.Comments__c = String.valueOf(count);
            accMap.put(acc.Id,acc);
        }
        database.update(accMap.values(),false);
    }
    public static void updateAccountChangeonDescription(List<Contact> newConList , Map<Id,Contact> oldConMap){
       Set<Id> cnewonIds = new Set<Id>();
       Set<Id> oldconIds = new Set<Id>();
        for(contact con1 : newConList){
            cnewonIds.add(con1.AccountId);
        }
        for(contact con2 : oldConMap.values()){
            oldconIds.add(con2.AccountId);
        }
       Map<Id,Account> oldndNewConaccMap = new Map<Id,Account>([Select Id,Name,(Select Id,AccountId,description from contacts) from Account where (Id IN :oldconIds OR Id IN: cnewonIds)]);
       //Map<Id,Account> newConaccMap = new Map<Id,Account>([Select Id,Name,(Select Id,AccountId,description from contacts) from Account where Id in :  ]);
         system.debug('oldndNewConaccMap>>>'+oldndNewConaccMap);
        if(oldndNewConaccMap.size()>0){
        for(Contact con : newConList){
            if(oldConMap.get(con.Id).AccountId != null /*&& con.AccountId != null*/&& oldndNewConaccMap.get( con.AccountId).Name != oldndNewConaccMap.get(oldConMap.get(con.Id).AccountId).Name ){
                if(con.AccountId != null){
                    system.debug('newConaccMap>>>'+oldndNewConaccMap.get( con.AccountId).Name);
                con.description = oldndNewConaccMap.get(con.AccountId).Name + '-' + oldndNewConaccMap.get(oldConMap.get(con.Id).AccountId).Name;
                }
                else{
                    system.debug('>>>>>>>>.');
                 con.description = oldndNewConaccMap.get(oldConMap.get(con.Id).AccountId).Name;   
                }
            }
            }
        
        }
    }
}