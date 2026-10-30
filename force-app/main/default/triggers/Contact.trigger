trigger Contact on Contact (After insert,Before update) {
  /****
   * Trigger context variables
   * 
   * trigger.isInsert
   * trigger.isUpdate
   * isDelete
   * isUndelete
   * isAfter
   * isBefore
   * isExicuting
   * trigger.new
   * trigger.Old
   * tigger.newMap
   * tigger.oldMap
   * size
   * operationType 
   * 
   * ***/
    //System.TriggerOperation BEFORE_UPDATE = System.TriggerOperation.update;
    //System.TriggerOperation triggerOperation = System.TriggerOperation.INSERT;
    /*if(Trigger.isupdate && Trigger.isAfter){
        Account acc = new Account();
        acc.Id = Trigger.new[0].AccountId;
        acc.Name = 'TestJK';
        update acc;
    }*/
   /* if(trigger.isAfter && trigger.isInsert){
        System.debug('trigger.operationType>>>'+trigger.operationType);
        contactHandler.updateNoOfContactsOnRelatedAcc(trigger.NewMap);
    } 
    if(trigger.isBefore && trigger.isUpdate){
        System.debug('trigger.operationType>>>'+trigger.operationType);
       contactHandler.updateAccountChangeonDescription(trigger.New,trigger.oldMAP); 
    }*/
    Set<Id> accountIdSet = new Set<Id>();
    Map<String,Account> conAmountAccountMap = new Map<String,Account>(); 
    List<Account> accList = new List<Account>();
    Integer Amount = 0;
    if(Trigger.isInsert && Trigger.isAfter){
        for(Account acc: [SELECT Id,(SELECT Id,Amount__c,AccountId FROM Contacts) FROM Account
                          WHERE Id IN (SELECT AccountId FROM Contact WHERE Id IN : Trigger.newmap.keyset())]){
            if(acc.Contacts.size() == 10){
              for(Contact con : acc.Contacts){
                Amount  += (Integer)con.Amount__c ;
              } 
             acc.Toatal_Amount__c = Amount;
            }
           conAmountAccountMap.put(acc.Id,acc); 
        }
        if(conAmountAccountMap.size()>0){
            update conAmountAccountMap.values();
        }
        
    }
    if(Trigger.isInsert && Trigger.isAfter){
        Set<Id> accountIdSet = new Set<Id>();
        for(Contact conRec : trigger.new){
            if(conRec.AccountId != null){
                accountIdSet.add(conRec.AccountId);
            }
        }
        ContactController.updateParentAccountDetails(accountIdSet);
    }
}