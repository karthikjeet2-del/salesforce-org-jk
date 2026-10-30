public with sharing class DateTimeExtractor{
    
 @AuraEnabled
 public static Datetime getLiveDateandTime(){
    try {
        system.debug('system.now()>'+system.now());
        return system.now();
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
 }
}