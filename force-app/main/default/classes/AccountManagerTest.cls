@istest
public class AccountManagerTest {
    @istest static void getAccountIdTest(){
        Id accounTid=createAccount();
        restrequest request= new restrequest();
        request.requestURI='https://karthikjk-dev-ed.my.salesforce.com/services/apexrest/Accounts/'+accounTid+'/contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;
        Account acc = AccountManager.getAccount();
        
    }
    static Id createAccount(){
        Account cc = new Account();
        cc.Name='Test';
        insert cc;
        Contact con = new Contact();
        con.LastName='test343';
        insert con;
        return cc.Id;
    }
}