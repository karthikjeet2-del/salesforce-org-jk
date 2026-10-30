public with sharing class TransferMassRecords {
    
    @AuraEnabled
    public static string massTransferRecords(List<String> recordIds,String newUserId){
        try {
            List<Opportunity> oppList = new List<Opportunity>();
            for(String recordId : recordIds){
                Opportunity opp = new Opportunity();
                opp.Id = recordId;
                opp.OwnerId = newUserId;
                oppList.add(opp);
            }
            if(!oppList.isempty()){
                Database.SaveResult[] results = Database.Update(oppList,false);
                system.debug('results>'+results);
                return 'SUCCESS';
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return null;
    }
    @AuraEnabled
    public static List<sobject> findUserRecords(String searchKey,String objectName,String fieldAPI,String filterCond){
        string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';
        
        string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6';
        return Database.query(query);
    }
}