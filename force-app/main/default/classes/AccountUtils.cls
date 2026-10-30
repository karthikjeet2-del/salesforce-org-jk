public class AccountUtils {
    public static List<Account> accountsByState(string stater){
        List<Account>AccList=[select id,Name from Account where Billingstate=:stater];
        return AccList;
    }
}