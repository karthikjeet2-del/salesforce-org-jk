public with sharing class displayRelatedData {
    @auraenabled(cacheable=true)
    public static List<Book__C> displayRelatedBooks(String accountId) {
        system.debug('Test'+accountId);
     return [Select id,Name from book__c where BookId__c=:accountId];
    }
}