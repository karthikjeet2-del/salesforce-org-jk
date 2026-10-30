public with sharing class BookWebsiteHandler {

    @AuraEnabled
    public static List<String> getBookGenres(){
        try {
        List < String > pickListValuesList = new List < String > ();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get('Book__c');
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get('Book_Genre__c').getDescribe();
        List < Schema.PicklistEntry > fieldPicklist = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry pickListVal: fieldPicklist) {
            pickListValuesList.add(pickListVal.getLabel());
        }
        system.debug('pickListValuesList>'+pickListValuesList);
        return pickListValuesList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}