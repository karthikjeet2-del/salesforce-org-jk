/*
   @description       : 
   @author            : karthik J
   @group             : 
   @last modified on  :  30-03-2022
   @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
   */
public class CaseAllocateHandler {
   
    @AuraEnabled
    public static List < Collection_Filter__mdt > getFielddata() {
        return [select id, MasterLabel, Data_Type__c, DeveloperName from Collection_Filter__mdt];
    }
    @AuraEnabled
    public static List < Collection_Rule__c > getExistingFilterData(string clusterName) {
        set < String > clusterSet = new Set < string > ();
        for (string cluster: clusterName.split(',')) {
            clusterSet.add(cluster);
        }
        List < Collection_Rule__c > collectionRuleList = [select id, Condition__c, Cluster__c, createdby.Name, Logic__c, Name, createddate from Collection_Rule__c where Cluster__c IN: clusterSet];
        set < string > uniqueCollectionruleSet = new Set < string > ();
        List < Collection_Rule__c > uniqueRuleList = new List < Collection_Rule__c > ();
        for (Collection_Rule__c record: collectionRuleList) {
            if (!uniqueCollectionruleSet.contains(record.Logic__c)) {
                uniqueRuleList.add(record);
                uniqueCollectionruleSet.add(record.Logic__c);
            }
        }
        return uniqueRuleList;
    }
    @AuraEnabled
    public static String insertCollectionAssignmentRec(string rule, string cluster) {
        List<Collection_Assignment__c> existingRuleList = [Select Id,Name from Collection_Assignment__c where Name=:rule];
        if(existingRuleList.size()==0){
        Collection_Assignment__c newAssignmentRecord = new Collection_Assignment__c();
        newAssignmentRecord.Name = rule;
        newAssignmentRecord.RuleName__c = rule;
        newAssignmentRecord.Cluster__c = cluster;
        insert newAssignmentRecord;
        return newAssignmentRecord.id;
        }
        return 'Duplicate RuleName';
    }
    @AuraEnabled(cacheable = true)
    public static List < String > getPickListValuesIntoList(String objectType, String selectedField) {
        List < String > pickListValuesList = new List < String > ();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        List < Schema.PicklistEntry > fieldPicklist = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry pickListVal: fieldPicklist) {
            pickListValuesList.add(pickListVal.getLabel());
        }
        return pickListValuesList;
    }
    @AuraEnabled
    public static List < sObject > getCaseRecords(string queryString) {
        List < Group > routineList = [Select Id, DeveloperName from Group where DeveloperName = 'Routine_Team'];
        String routineQueueId = routineList.get(0).Id;
        set < string > notAllocateCaseList = new set < string > (Label.Case_Status_for_Allocation.split(','));
        if (routineQueueId != null && notAllocateCaseList.size() > 0) {
            queryString = queryString + ' AND ownerId=:routineQueueId AND status Not In:notAllocateCaseList';
        }
        List < sObject > sobjList = Database.query(queryString);
        return sobjList;
    }
    @AuraEnabled
    public static Collection_Rule__c insertCollectionRuleRecords(string jsonString, List < Case > caseData) {
        List < Collection_Case_Assignment__c > caseAssignmentList = new List < Collection_Case_Assignment__c > ();
        Collection_Rule__c collectionRuleObject = (Collection_Rule__c) JSON.deserialize(jsonString, Collection_Rule__c.class);
        insert collectionRuleObject;
        if (caseData != null) {
            for (Case newcase: caseData) {
                Collection_Case_Assignment__c assignmentRec = new Collection_Case_Assignment__c();
                assignmentRec.Case_ID__c = newcase.id;
                assignmentRec.Name = newcase.CaseNumber;
                assignmentRec.Collection_Rule__c = collectionRuleObject.id;
                assignmentRec.Cluster__c = newcase.Cluster__c;
                caseAssignmentList.add(assignmentRec);
            }
        }
        if (caseAssignmentList.size() > 0) {
            insert caseAssignmentList;
        }
        return [select id, CaseAssigmentRecords__c, createdby.Name, Cluster__c, Name from Collection_Rule__c where id =: collectionRuleObject.id];
    }
    @AuraEnabled(cacheable = true)
    public static Wrapperclass getSCMforCluster(string clusterName) {
        Wrapperclass wrappInstance = new Wrapperclass();
        wrappInstance.clusterMemberDataList = [select id, Name, Active__c, Service_Resource__c, Service_Resource__r.RelatedRecordId,
            Service_Resource__r.RelatedRecord.Name, Start_Date__c from Service_Cluster_Member__c where
            Service_Resource__r.Cluster__c =: clusterName
        ];
        wrappInstance.activeClusterMemberData = [select id, Name, Active__c, Service_Resource__c, Service_Resource__r.RelatedRecordId,
            Service_Resource__r.RelatedRecord.Name, Start_Date__c from Service_Cluster_Member__c where
            Active__c = true AND Service_Resource__r.Cluster__c =: clusterName
        ];
        return wrappInstance;
    }
    @AuraEnabled
    public static Wrapperclass updateSeviceClusterMemberdata(string clusterName, string jsonString) {
        List < Service_Cluster_Member__c > serviceClusterMemberObject = (List < Service_Cluster_Member__c > ) JSON.deserialize(jsonString, List < Service_Cluster_Member__c > .class);
        update serviceClusterMemberObject;

        Wrapperclass wrappInstance = new Wrapperclass();
        wrappInstance.clusterMemberDataList = [select id, Name, Active__c, Service_Resource__c, Service_Resource__r.RelatedRecordId,
            Service_Resource__r.RelatedRecord.Name, Start_Date__c from Service_Cluster_Member__c where
            Service_Resource__r.Cluster__c =: clusterName
        ];
        wrappInstance.activeClusterMemberData = [select id, Name, Active__c, Service_Resource__c, Service_Resource__r.RelatedRecordId,
            Service_Resource__r.RelatedRecord.Name, Start_Date__c from Service_Cluster_Member__c where
            Active__c = true AND Service_Resource__r.Cluster__c =: clusterName
        ];
        return wrappInstance;
    }
    @AuraEnabled(cacheable = true)
    public static List < Collection_Case_Assignment__c > allocateCollectionCaseRecords(string collectionAssignmentId, string cluster, Integer caseLimit) {
        string str = '%' + cluster + '%';
        return [Select Id, Cluster__c, Case_ID__c, Assigned_To__c, Collection_Rule__c from Collection_Case_Assignment__c where
            Collection_Rule__r.Collection_Assignment__r.Id =: collectionAssignmentId AND Collection_Rule__r.Name like: str limit: caseLimit
        ];
    }
    @AuraEnabled
    public static string updateAllocatedCollectionRecords(List < Collection_Case_Assignment__c > updatedCollectionCaseList) {
        try {
            update updatedCollectionCaseList;
            return 'SUCCESS';
        } catch (Exception ex) {
            ExceptionHandler.logException('CaseAllocateHandler', 'updateAllocatedCollectionRecords', '', '', 'High', ex, 'Catch Block-' + ex.getLineNumber());
        }
        return 'Failed to update';
    }
    @AuraEnabled
    public static string allocateCaseRecordsToAssociates(string collectionAssignmentId, string cluster, Integer caseLimit) {
        List < AsyncApexJob > jobCount = [SELECT Id FROM AsyncApexJob WHERE ApexClass.Name = 'CaseAssignmentBatch'
            AND Status IN ('Queued','Processing')
        ];
        if (jobCount.size() <= 0) {
            CaseAssignmentBatch instance = new CaseAssignmentBatch(collectionAssignmentId, cluster, caseLimit);
            Database.executeBatch(instance, 100);
            return 'success';
        } else {
            return 'Batch Already Running';
        }
    }
    public class Wrapperclass {
        @AuraEnabled
        public List < Service_Cluster_Member__c > clusterMemberDataList;
        @AuraEnabled
        public List < Service_Cluster_Member__c > activeClusterMemberData;
        @AuraEnabled
        public string cluster;
        @AuraEnabled
        public List < Case > casedata;

    }

}