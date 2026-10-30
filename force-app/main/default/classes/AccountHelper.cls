public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating,
                Phone, Website, AnnualRevenue,Industry,Description
            FROM Account];
    }
    @AuraEnabled
    public static List<Account> acoountsdetails() {
        datetime todaydate = system.today();
        system.debug('heree'+[SELECT Id, Name, Type, Rating,
        Phone, Website, AnnualRevenue,Industry,Description
    FROM Account where createddate = Last_N_days:1]);
        
        return [SELECT Id, Name, Type, Rating,
        Phone, Website, AnnualRevenue,Industry,Description
    FROM Account where createddate = Last_N_days:1];
    }
}