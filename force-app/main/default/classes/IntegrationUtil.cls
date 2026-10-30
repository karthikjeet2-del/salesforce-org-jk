public with sharing class IntegrationUtil {
    
    public static HttpResponse performcallout(String subEndpoint,String metaDataDevName){
        system.debug('here Inside IntegrationUtil');
        IntegrationMetadata__mdt getYTDetails = [SELECT Id,MasterLabel,Access_Token__c,Endpoint__c,Method__c FROM IntegrationMetadata__mdt 
                                                 WHERE DeveloperName=: metaDataDevName];

        String endpoint = getYTDetails.Endpoint__c+ subEndpoint + '&key=' + getYTDetails.Access_Token__c;    
        system.debug('endpoint>>'+endpoint);                             
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndPoint(endpoint);
        req.setMethod('GET');
        httpresponse response = http.send(req);
        return response;
        
    }
}