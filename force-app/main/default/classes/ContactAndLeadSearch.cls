public class ContactAndLeadSearch {
    public static List<List<sObject>> searchContactsAndLeads(String param){
        return [Find :param in all fields returning contact(LastName),Lead(LastName)];
    }
}