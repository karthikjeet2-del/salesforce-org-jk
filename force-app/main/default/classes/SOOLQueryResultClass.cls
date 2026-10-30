public with sharing class SOOLQueryResultClass {
    
    @auraEnabled
    public static List<Account> sOQLInjectedQueryResult(string input) {//karthik%' or name like '
        return [SELECT id,Name from Account WHERE Name like '%input%'];

    }
    @auraEnabled
    public static List<Account> sOQLInjectionSanitisedQueryResult(string input) {
        String sanitisedInput = '%'+input+'%';
        try{
        return [SELECT id,Name from Account WHERE Name like :sanitisedInput];
        }
        catch(exception e){
            return null;
        }

    }
}