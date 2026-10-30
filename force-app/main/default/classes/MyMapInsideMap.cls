public class MyMapInsideMap {
    public static void test(){
        Map<String,Map<String,List<K2__c>>> mainmap = new Map<String,Map<String,List<K2__c>>>();//Map<id,Map<id,List<K2__c>>> mainmap = new Map<id,Map<id,List<K2__c>>>();
        Map<String,List<K2__c>> insidemap = new Map<String,List<K2__c>>();// Map<id,List<K2__c>> insidemap = new Map<id,List<K2__c>>();
        List<Account> accContact = [select id,Name,(select id,LastName from contacts) from Account where id =:'0015g000006Wd86AAC'];
        set<Id> conIds = new set<Id>();
        for(Account acc:accContact){
            for(Contact con:acc.contacts){
                conIds.add(con.id);
            }
        }
        List<Contact> conKdata = [select id,LastName,(select Name,username__c from K2s__r) from Contact where id in:conIds];
        for(Contact con:conKdata){
            insidemap.put(con.LastName,con.K2s__r);// insidemap.put(con.id,con.K2s__r);
        }
        
        for(Account acc:accContact){
            mainmap.put(acc.Name,insidemap);//mainmap.put(acc.id,insidemap);
        }
        System.debug('mainmap>>'+mainmap);
    }
}