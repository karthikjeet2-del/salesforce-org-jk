@isTest
public class Discountonbooks_test {
static testMethod void method1() {
Book__c b = new Book__c(Name='wings of fire', Price__c=300);
Test.startTest();
insert b;
Test.stopTest();
}
}