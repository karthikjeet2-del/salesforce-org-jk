public with sharing class AccountDataHelper {
    @auraEnabled(cacheable=true)
    public static List<Account> getAccountData( string value1,string value2){
          return [select id,Name,phone,AnnualRevenue from Account where AccountSource=:value1 AND Industry=:value2];
    }
    @auraEnabled(cacheable=true)
    public static List<Account> getFilteredData( string value1,string value2,string value3){
        List<Account> AccList=new List<Account>();
        if(value2=='EqualTo'){
            system.debug('value1'+value1);
         AccList= [select id,Name,phone,AnnualRevenue from Account where Industry=:value3];
        }
         return AccList;
    }
     @AuraEnabled(cacheable=true)
    public static List<String> getPickListValuesIntoList(String objectType, String selectedField){
            List<String> pickListValuesList = new List<String>();
            Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
            Schema.DescribeSObjectResult res = convertToObj.getDescribe();
            Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                pickListValuesList.add(pickListVal.getLabel());
            }     
            return pickListValuesList;
        }
    public static void updateAccountrecord(List<Account> accList1){
        //List<account> accList = new List<Account>();
        /*for(Account acc : accList1){
          acc.name= 'Test';
          accList.add(acc);
        }*/
        String acc = accList1[3].name;
   // update accList;
    }

}