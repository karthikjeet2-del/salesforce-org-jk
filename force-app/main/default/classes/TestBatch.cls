public class TestBatch implements Database.batchable<sObject>,Database.stateful,Schedulable{
    public static Integer count=0;
    public Database.QueryLocator start(Database.BatchableContext bC){
        String query = '';
        return Database.getQueryLocator(query);
    }  
    public void execute(Database.BatchableContext bC,List<Account> accList){
        // Some awesome code goes here....
        //count++; //Count number of record processed by the batch class
    }
    public void finish(Database.BatchableContext bC){
      //Post comit logic like sending email etc. 
      
    }
    public void execute(SchedulableContext sC){
        Database.executebatch(new TestBatch(),200);
    }
}