public class HolidayAttachment {
    @AuraEnabled
    public static list<id> fetchAttachment(){
        list<id> holidayid=new list<id>();
        holiday__c Recordid=[select id  from holiday__c limit 1];
        System.debug('<key>>>'+Recordid);
        List<Id> courceid = new List<Id>();
        courceid.add(Recordid.id);
        for(ContentDocumentLink Contelink : [SELECT Id, ContentDocumentId,ContentDocument.FileExtension, ContentDocument.LatestPublishedVersionId,ContentDocument.LatestPublishedVersion.Title,SystemModstamp,LinkedEntityId,Visibility,ShareType FROM ContentDocumentLink WHERE LinkedEntityId IN: courceid and ContentDocument.FileExtension IN ('jpg','png','jpeg') order by SystemModstamp ASC])
        {
            // CourImalink.put(Contelink.LinkedEntityId,Contelink.ContentDocument.LatestPublishedVersionId);
            //System.debug('<key>>>'+Contelink.LinkedEntityId);
            //System.debug('<holiday id>>>'+Contelink.ContentDocument.LatestPublishedVersionId);
            holidayid.add(Contelink.ContentDocument.LatestPublishedVersionId);
        }
        return holidayid;
    }
    
}