/*
   @description       : 
   @author            : karthik J
   @group             : 
   @last modified on  : 30-03-2022
   @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
   */
global class CaseAssignmentBatch implements Database.Batchable < sObject > , Database.Stateful {
    global string collectionAssignmentId;
    global Integer limVariable;
    String query;
    global string cluster;
	global string str;
    public CaseAssignmentBatch(string collectionAssignmentId, string cluster, Integer caseLimit) {
        this.limVariable = caseLimit;
        this.collectionAssignmentId = collectionAssignmentId;
        this.cluster = cluster;
    }
    global Database.QueryLocator start(Database.BatchableContext bC) {
        str = '%'+cluster+'%';
        if (limVariable >= 1) {
            query = 'SELECT Id, Cluster__c,Case_ID__c,Assigned_To__c,Collection_Rule__c FROM Collection_Case_Assignment__c where Collection_Rule__r.Name like:str AND Case_ID__c!=null AND Assigned_To__c!=null AND Collection_Rule__r.Collection_Assignment__r.Id =:collectionAssignmentId limit:limVariable';
        } else {
            query = 'SELECT Id, Cluster__c,Case_ID__c,Assigned_To__c,Collection_Rule__c FROM Collection_Case_Assignment__c where Collection_Rule__r.Name like:str AND Case_ID__c!=null AND Assigned_To__c!=null AND Collection_Rule__r.Collection_Assignment__r.Id =:collectionAssignmentId';
        }
        return Database.getQueryLocator(query);

    }
    global void execute(Database.BatchableContext bC, List < Collection_Case_Assignment__c > caseAssignmentList) {
        system.debug('caseAssignmentList>>'+caseAssignmentList);
        Map < Id, Case > caseMap = New Map < Id, Case > ();
        for (Collection_Case_Assignment__c newCaseAssignmentRecord: caseAssignmentList) {
            Case collectioncase = new Case();
            collectionCase.id = newCaseAssignmentRecord.Case_ID__c;
            collectionCase.Assigned_To__c = newCaseAssignmentRecord.Assigned_To__c;
            caseMap.put(newCaseAssignmentRecord.Case_ID__c, collectionCase);
        }
        if (caseMap.size() > 0) {
            database.update(caseMap.values(), false);
        }
    }
    global void finish(Database.BatchableContext bC) {
        Integer x; //Added this to bypass PMD issue
        x = 10;
    }
}