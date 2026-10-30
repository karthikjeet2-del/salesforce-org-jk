public class Discountonbooks {
    /*public static void applyDiscount(Book__c[] books) {
for(Book__c b :books){
b.Price__c *= 0.4;
}
}*/
    public static Set<Id> bookrecordIds = new Set<Id>();
    public static void processBookRecords(List<Book__c> bookRecList){
        system.debug('bookRecList>>'+bookRecList.size());
        for(Book__c bookRec : bookRecList){
            if(!bookrecordIds.contains(bookRec.Id)){
                bookRec.name = bookRec.name+' I am Baptised by The great Karthik';
            }
        }
    }
    
}