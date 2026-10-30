/* Author : Karthik J
* Createddate : 14/12/2022
* 
* Description : This Batch will collect all the Capital Opportunities based on the below condition.
*               1) Createddate < 45 days
*               2) LastModifiedDate < 30 days
*/
public class CloseCapitalOpportunityBatch implements Database.Batchable<sObject>{
    
    public database.QueryLocator start(database.BatchableContext bC){
        datetime lastModified_30Days = system.today().adddays(-30);
        datetime createdDate_45Days = system.today().adddays(-45);
        string query='SELECT Id  FROM Opportunity WHERE  LastModifiedDate<'+lastModified_30Days+' AND CreatedDate<'+createdDate_45Days;//+' AND (Type=\'CARDS\' OR Type=\'LOC\')';
        //string query='SELECT Id,LOS_Application_ID__c  from Opportunity WHERE LOS_Application_ID__c= null AND LastModifiedDate<:'+lastModified_30Days+' AND CreatedDate<:'+createdDate_45Days+' AND (Type=\'CARDS\' OR Type=\'LOC\')';
        return database.getQueryLocator(query);
    }  
    public void execute(database.BatchableContext bC,List<Opportunity> oppList){
        system.debug('oppList>'+oppList);
        Database.DeleteResult[] deletedOppResults = Database.Delete(oppList,false);
    }
    public void finish(database.BatchableContext bC){
        system.debug('Capital Opportunities are deleted!');
    }
}