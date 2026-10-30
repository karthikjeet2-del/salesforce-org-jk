public class AccRelatedConUpdate {
   public static List<Contact> updateContactBillingAddress(List<Account> lstNew, Map<ID,Account> mapOld)
{
  List<Contact> result = new List<Contact>();
  Set<Id> accIds = new Set<Id>();

    for(Account acc : lstNew)
    {
        if(acc.Billing_Address__c != null && acc.Billing_Address__c != mapOld.get(acc.Id).Billing_Address__c)
        {
            accIds.add(acc.Id);
        }
    }

    if(!accIds.isEmpty())
    {        
        for(Contact con : [Select ID,Active__c, Account.Billing_Address__c,Billing_Address__c FROM Contact where AccountID IN :accIds])
        {
            if(con.Active__c == true){
                if(con.Billing_Address__c != con.Account.Billing_Address__c)
                {
                    con.Billing_Address__c = con.Account.Billing_Address__c;
                    result.add(con); 
                }
             }
            else
            {
                con.Billing_Address__c = null;
                result.add(con); 
            }
        }
    } 
    return result;
}
}