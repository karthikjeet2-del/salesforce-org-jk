public class DefectPractice {
    @AuraEnabled
    public static Employee__c[] empdetails(){
        return [select name,Employee_name__c,Phone_No__c from Employee__c];
    }
    @AuraEnabled
    public static string getEmpRecord(Employee__c Emp){
        insert Emp;
        return Emp.id;
    }
    @AuraEnabled
    public static string updatedrecord(Employee__c ts){
        System.debug('ts>'+ts);
        update ts;
        return ts.id;
        
    }
    @AuraEnabled
    public static Employee__c editrecord(String recordempId){
        //System.debug('recordempId>>'+recordempId);
        Employee__c editedrecord=[select name,Employee_name__c,Phone_No__c from Employee__c where id=:recordempId];
       // System.debug('editedrecord>>'+editedrecord);
        return editedrecord;
    }
    @AuraEnabled
    public static void updatePicturePath(String recId){  
        //In lighting, the attachments are stored in content documents
        ContentDocumentLink docLink = [ SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :recId order by Id desc LIMIT 1]; 
        system.debug('docLink>>'+docLink);
        ContentVersion version = [SELECT Id FROM ContentVersion WHERE ContentDocumentId = :docLink.ContentDocumentId]; 
        //Update the Picture_Path field with the url of the image
        Employee__c product = [SELECT Id FROM Employee__c WHERE Id =:recId];
        system.debug('product>>'+product);
        product.Picturepath__c = '/sfc/servlet.shepherd/version/download/' + version.Id; 
        upsert product;        
    }
}