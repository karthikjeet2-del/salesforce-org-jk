public class Lightningassignment {
 @AuraEnabled
    public static string Insertdetail(Account data1,Contact data2){
       // data2.AccountId=data1.id;
        insert data1;
        Contact con=new Contact();
        con.AccountId = data1.Id;
        con.LastName = data2.LastName;
        con.Email = data2.Email;
        insert con;
        return data1.Id;
    }
}