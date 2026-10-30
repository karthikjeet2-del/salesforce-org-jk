/*public class YTController {
    
    @AuraEnabled
    public static mywrapper getDetailsfromYT(string searchInput){
        String searchKey = searchInput == null?'Salesforce':searchInput;
        IntegrationMetadata__mdt getYTDetails = [SELECT Id,MasterLabel,Access_Token__c,Endpoint__c,Method__c FROM IntegrationMetadata__mdt 
                                                 WHERE DeveloperName='Get_YouTube_Videos'];
        Http http=new Http();
        HttpRequest request = new HttpRequest();
        String endpoint  = getYTDetails.Endpoint__c +'?part=snippet' + '&q=' + EncodingUtil.urlEncode(searchKey, 'UTF-8') + '&maxResults=2'+'&type=video'+'&chart='+searchInput +'&key='+getYTDetails.Access_Token__c;
        
        request.setEndpoint(endpoint);
        request.setmethod('GET');
        HttpResponse response= http.send(request);
        system.debug('Body>>>>..'+response.getBody());
        mywrapper wrapp = new mywrapper();
        if(response.getStatusCode()== 200){
        YouTubeResult.response data = (YouTubeResult.response) JSON.deserialize(response.getbody(),YouTubeResult.response.class);
        List<YouTubeResult.Item> ytList = data.items;
        for(YouTubeResult.Item item : ytList){
           system.debug('item--->'+item);
            wrapp.videoId = item.id.videoId;
            wrapp.description=item.snippet.description;
            wrapp.thumbnails=item.snippet.thumbnails.medium.url;
            wrapp.title=item.snippet.title;
            wrapp.channelTitle=item.snippet.channelTitle;
            wrapp.publishedAt=item.snippet.publishedAt;
        }
        system.debug('wrapp>>'+wrapp);
        return wrapp;
    }
    return null;
    }

    public class mywrapper{
        @AuraEnabled public string videoId {get;set;}
        @AuraEnabled public string description {get;set;}
        @AuraEnabled public String thumbnails {get;set;}
        @AuraEnabled public String title {get;set;}
        @AuraEnabled public String channelTitle {get;set;}
        @AuraEnabled public Datetime publishedAt  {get;set;}
    }

}*/
public with sharing class YTController {
    
    @AuraEnabled(cacheable=true)
    public static list<mywrapper> getYTVideos(string searchKey){
        searchKey = searchKey == null ? 'salesforce' : searchKey;
        String part ='snippet%2CcontentDetails%2Cstatistics';
        String subEndpoint  = '?part=' + part +'&maxResults=20' +'&type=video' +'&q=' + EncodingUtil.urlEncode(searchKey, 'UTF-8') ;
    
        httpresponse res = IntegrationUtil.performcallout(subEndpoint,'Get_YouTube_Videos');

        //Deserializing json data
        if(res.getStatusCode() == 200){
            system.debug('inside');
            YouTubeResult.Response response = (YouTubeResult.Response)JSON.deserialize(res.getBody(), YouTubeResult.Response.class);
            List<YouTubeResult.Item> items  =  response.items;
        
        //Filling Wrapper Data for lightning component
        List<mywrapper> wrp  = new List<mywrapper>();

        for (YouTubeResult.Item itemObj : items) {
            mywrapper YTWrap = new mywrapper();
            YTWrap.videoId = itemObj.id.videoId;
            YTWrap.description = itemObj.Snippet.description;
            YTWrap.thumbnails = itemObj.Snippet.thumbnails.medium.url;
            YTWrap.title = itemObj.Snippet.title;
            YTWrap.channelTitle = itemObj.Snippet.channelTitle;
            YTWrap.channelId = itemObj.Snippet.channelId;
            YTWrap.subscriberCount = itemObj.statistic.subscriberCount;
            YTWrap.videoCount = itemObj.statistic.videoCount;
            YTWrap.viewCount = itemObj.statistic.viewCount;

            wrp.add(YTWrap);
        }
        return wrp;
    }
    return null;

    }

    @AuraEnabled
    public static void getChannelDetails(String channelId){
        if(channelId != null){
            system.debug('channelId>>>>>>>>>>..'+channelId); 
            String part ='snippet%2CcontentDetails%2Cstatistics';
            String subEndpoint='?part=' + part + '&maxResults=1' + '&id=' +channelId;
            httpresponse res = IntegrationUtil.performcallout(subEndpoint,'Get_YouTube_Channel');
            system.debug('res>>>>>>>>>>..'+res.getbody()); 
        }
        

                    
    }
    public class mywrapper{
        @AuraEnabled public string videoId {get;set;}
        @AuraEnabled public string description {get;set;}
        @AuraEnabled public String thumbnails {get;set;}
        @AuraEnabled public String title {get;set;}
        @AuraEnabled public String channelTitle {get;set;}
        @AuraEnabled public String publishedAt  {get;set;}
        @AuraEnabled public String channelId {get;set;}
        @AuraEnabled public Integer subscriberCount {get;set;}
        @AuraEnabled public Integer videoCount  {get;set;}
        @AuraEnabled public Integer viewCount {get;set;}
    }
}