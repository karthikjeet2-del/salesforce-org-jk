public class ContactController {

    public String getC() {
        return null;
    }
    public static void updateParentAccountDetails(Set<Id> accountIdSet){
        List<Account> accList = new List<Account>();
        for(Id accountId : accountIdSet){
            Account accRec = new Account();
            accRec.Id = accountId;
            accRec.Name ='Update Test Name';
            accList.add(accRec);
        }
        if(!accList.isEmpty()){
            Database.update(accList,false);
        }
    }
}