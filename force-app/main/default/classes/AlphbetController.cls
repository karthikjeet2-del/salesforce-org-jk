public with sharing class AlphbetController {
  @AuraEnabled
  public static List<sObject> getAccountData(string query){
    List<sObject> sobjList=database.query(query);  
    return sobjList;
  }
}