public class Assignment2onLC {
    @AuraEnabled
    public static string isEnabled(Account tdata,Contact ccc){
        insert tdata;
        contact con=new contact();
        con.AccountId=tdata.id;
        con.LastName=ccc.LastName;
        con.phone=ccc.phone;
        insert con;
        K2__c k1 = new K2__c();
        k1.Email__c = con.Id;
        k1.Name=tdata.Name+con.LastName;
        k1.username__c=tdata.Name+con.LastName+'@gmail.com';
        insert k1;
        return tdata.id;
    }
}