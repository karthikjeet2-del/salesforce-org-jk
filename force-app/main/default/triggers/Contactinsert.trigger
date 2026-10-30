trigger Contactinsert on Account (after update,after insert) {
    /*Account acc = [select id,Name,AccountNumber,Site,phone from Account where id =: Trigger.New];
    System.debug('acc>>'+acc);
    
    if(Trigger.IsInsert) {
        Contact c1 = new Contact();
        c1.LastName = acc.Name;
        c1.MobilePhone = '123456';
        c1.AccountId = acc.Id;
        insert c1;
        
        Contact c2 = new Contact();
        c2.LastName = acc.Name;
        c2.MobilePhone = '456546546';
        c2.AccountId = acc.Id;
        insert c2;
    }
    else if(Trigger.IsUpdate){
        List<Contact> conlist=[select id,LastName from Contact where AccountId =:acc.Id];
        for(Contact con:conlist){
            con.LastName=acc.Name;
        }
        List<Contact> conlist1=new  List<Contact>();  
        for(Contact c1:conlist){
            conlist1.add(c1);
        }
        update conlist1;
    }
    else if(Trigger.isDelete){
        Account acc = [select id,Name,AccountNumber,Site,phone from Account where id =: Trigger.old];
        delete acc;
    }
    else if(Trigger.isUndelete){
        Account acc1 = [select id,Name,AccountNumber,Site,phone from Account where id =: Trigger.New];
        System.debug('acc1>>here'+acc1);
        Account acc = new Account();
        acc.Name='This on is undo';
        acc.id= acc1.Id;
        update acc;
        
        // Undelete acc1;
    }
*/    
}