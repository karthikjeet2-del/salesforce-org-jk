public with sharing class GetRecipeDetails {
    private static final string API_KEY='74a47e9c751c4251aac02332a73bb04c';
    @AuraEnabled
        public static Map<string,Object>  getRandomRecipe(){
           Http http =new Http();
           Httprequest request =new Httprequest();
           request.setmethod('GET');
           request.setEndpoint('https://api.spoonacular.com/recipes/random?apiKey='+API_KEY);
           Httpresponse response=new Httpresponse();
           response= http.send(request);
           system.debug(response.getBody());
           Map<string,Object> results = (Map<string,Object>) JSON.deserializeUntyped(response.getBody());
           system.debug(results);
              return results;
         }
}