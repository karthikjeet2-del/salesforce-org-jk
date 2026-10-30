public class Wrappinsert {
    @AuraEnabled
    public static string test(string wrappdata3){
       wrapp1 wrappdata4=(wrapp1)system.JSON.deserialize(wrappdata3, wrapp1.class);
        insert wrappdata4.acc;
        contact con=new contact();
        con.AccountId=wrappdata4.acc.id;
        con.LastName=wrappdata4.con.LastName;
         con.Email=wrappdata4.con.Email;
        insert con;
        return wrappdata4.acc.id;
        
    }

 class wrapp1{
    @AuraEnabled
    public Account acc{get;set;}
    @AuraEnabled
    public Contact con{get;set;}
        
}
}