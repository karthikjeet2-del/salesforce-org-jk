public class AccountHandler {
    public static Account insertNewAccount(String param){
        Account acc= new Account(Name=param);
        try{
           insert acc; 
            return acc;
        }
        catch(exception e){
            return null;
        }
    }
}