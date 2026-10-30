public class RestApiclass {
   public static void sendRequestmethod(){
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
    request.setMethod('GET');
    HttpResponse response = http.send(request);
    if(response.getStatusCode() == 200) {
        Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        List<Object> meetingInfo = (List<Object>) results.get('animals');
        System.debug('Received the following meetings:');
        for(Object m: meetingInfo) {
            System.debug(m);
        }
    }
   
    }
}