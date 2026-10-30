public class Contactapexcontroller {
public contact con{get;set;}
    public ApexPages.StandardController controller;
    public Contactapexcontroller(ApexPages.StandardController controller) 
    { 
        this.controller = controller;
        String Idacc = ApexPages.CurrentPage().getparameters().get('id');
        if(Idacc != null){
            con = [select LastName,city__c,country__c,state__c,zipcode__c from contact where id =: Idacc];
        }
        else{
            con = new contact();
        }
    }
    public PageReference saveMethod(){ 
        insert con;
        return new PageReference('/' +con.Id);
    }
}