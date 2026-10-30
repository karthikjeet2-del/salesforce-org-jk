trigger Booktrig on Book__c (before insert,before update) {
    public static Integer count =1;
    //Discountonbooks.applyDiscount(books);
    if(trigger.isBefore && trigger.isUpdate){
        system.debug('How many times I am executed?--->'+count);
        count++;
        Discountonbooks.processBookRecords(trigger.new);
    }
}