public class animalLocator {
    
    public static void getAnimals(){
        HTTP http = new HTTP();
        httpRequest request = new httpRequest();
        request.setmethod('GET');
        request.setendpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setheader('content-type','application/JSON');
        httpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            String jSONBody = response.getbody();  
            system.debug('jSONBody>>>'+jSONBody);
            Map<string,Object> obj = (Map<string,Object>)JSON.deserializeUntyped(jSONBody);
            system.debug('obj>>>'+obj);  
        }
    }
}