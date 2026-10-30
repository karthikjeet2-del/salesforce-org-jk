trigger Account on Account (after Insert, after update) {
//con=AccRelatedConUpdate.updateContactBillingAddress(Trigger.new,trigger.oldmap);
//update con;
if(Trigger.isAfter && (Trigger.isInsert || Trigger.isupdate)){
    system.debug('Here Comes my curageous boy :)');
    /*Database.DmlOptions dlo = new Database.DmlOptions();
    dlo.EmailHeader.triggerUserEmail = true;
    Task newTask = new Task();
    newTask.Subject ='This is me A fearless Warrior 1';
    newTask.whatId = Trigger.New[0].Id;
    newTask.OwnerId = Trigger.New[0].OwnerId;
    Database.Saveresult result = Database.insert(newTask,dlo);
    system.debug('result>'+result);*/
    List<Account> acclist = new List<Account>();
    for (Account newAcc : Trigger.new ){
        Account updateAccount = new Account();
        updateAccount.Id = newAcc.Id;
        updateAccount.description = 'My life is filled with a lot of abundance. I am attracting stability descipline and determination under every situations';
        
        acclist.add(updateAccount);
    }
    if(!acclist.isEmpty()){
        Database.saveResult[] results = Database.update(acclist,false);
    }
    /*try{
    AccountDataHelper.updateAccountrecord(trigger.new);
    }catch(Exception e){
        System.debug('HERE I am Inside trigger');
    }
    /*List<account> accList = new List<Account>();
    for(Account acc : trigger.new){
       acc.name= 'Test';
       accList.add(acc);
    }
   update accList;*/
}
/*List<Task> taskList = new List<Task>();
if(Trigger.isAfter && Trigger.isUpdate){
    system.debug('Here Comes my curageous boy :)');
    Database.DmlOptions dlo = new Database.DmlOptions();
    dlo.EmailHeader.triggerOtherEmail = false;
    for(Integer i=0;i<3 ;i++){
    Task newTask = new Task();
    newTask.Subject ='This is me A fearless Warrior '+ i;
    newTask.whatId = Trigger.New[0].Id;
    newTask.OwnerId = Trigger.New[0].OwnerId;
    taskList.add(newTask);
    }
    Database.Saveresult[] result = Database.insert(taskList,dlo);
    system.debug('result>'+result);
}*/
}