public  class MyobjTest {
 public Myobj__c acc{get;set;}
    public ApexPages.StandardController controller;
    public MyobjTest(ApexPages.StandardController controller) 
    { 
        this.controller = controller;
        String Idacc = ApexPages.CurrentPage().getparameters().get('id');
        if(Idacc != null){
            acc = [select id,name,age__c,phone__c,active__c from Myobj__c where id =: Idacc];
        }
        else{
            acc = new Myobj__c();
        }
    }
    public PageReference saveMethod(){ 
        upsert acc;
        return new PageReference('/' +acc.Id);
    }
}