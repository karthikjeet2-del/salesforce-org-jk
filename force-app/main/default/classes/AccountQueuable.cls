public class AccountQueuable implements Queueable, Database.allowsCallouts {

    
    public void execute(QueueableContext context){
        HTTP http = new HTTP();
        HttpRequest request = new HttpRequest();
        request.setMethod('get');
        request.setEndpoint('callout:NamedCredential');
       // request.setType('json');
        
        HttpResponse response = http.send(request);
         
        system.debug('Body>>'+response.getbody());
    }
    
}