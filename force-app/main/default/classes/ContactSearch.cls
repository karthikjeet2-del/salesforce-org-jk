public class ContactSearch {
    public static List<Contact> searchForContacts(String p1,String p2){
        return [Select Id,Name from Contact where Lastname=:p1 AND MailingPostalCode=:p2];
    }

}