public with sharing class wrapperController {
   @AuraEnabled(cacheable=true)   
   public static List<wrapperclass> getAccountList(){
      List<wrapperclass> wrappList=new List<wrapperclass>();
      for(Account acc:[select id,Name from Account]){
        wrapperclass wrap=new wrapperclass();
        wrap.AccountId=acc.id;
        wrap.AccountName=acc.Name;
        wrappList.add(wrap);
      }
      system.debug('wrappList'+wrappList);
      return wrappList;
      }

  public class wrapperclass{
    @AuraEnabled 
    public string AccountId;
    @AuraEnabled
    public string AccountName;
  }
}