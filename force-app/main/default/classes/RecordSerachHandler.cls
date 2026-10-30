public with sharing class RecordSerachHandler {

    @AuraEnabled
    public static List<SearchOptions> searchMethod(String searchTerm , String objectName) {
        system.debug('searchTerm>>'+searchTerm+'-------objectName >>>'+objectName);
        List<SearchOptions>serachOptionList = new List<SearchOptions>();
        searchTerm = searchTerm + '*';
        String soslQuery = 'FIND \''+searchTerm+'\' IN Name FIELDS RETURNING '+ objectName+'(Id,Name)';
        List<List<sObject>> mainobjectList  = search.query(soslQuery);
        for(List<sObject> objectList : mainobjectList){
           for(sobject object1 : objectList){
               Account acc = (Account)object1;
               SearchOptions instance = new SearchOptions();
               instance.Name = acc.name;
               instance.Id = acc.Id;
               serachOptionList.add(instance);
           }
           system.debug('serachOptionList>>'+serachOptionList);
       }
       
        if(serachOptionList != null){
           return serachOptionList;
        }
        return null;
       }
   
       public class SearchOptions{
           @auraEnabled
           public string Name;
           @auraEnabled
           public string Id;
       }
}