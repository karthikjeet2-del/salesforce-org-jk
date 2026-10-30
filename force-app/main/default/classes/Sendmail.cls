public class Sendmail {
    @InvocableMethod (label='send mail') 
    public static void mail(){
        List<Messaging.SingleEmailMessage> mails = 
            new List<Messaging.SingleEmailMessage>();
        
        Messaging.SingleEmailMessage mail = 
            new Messaging.SingleEmailMessage();
        date d1=system.today();
       // list<Employee__c> emp=[select Employee_name__c,ManagerId__r.Name,Email__c from Employee__c where ];
        //system.debug('emp'+emp);
        List<String> sendTo = new List<String>();
        sendTo.add('bhadrakarthik.j@gmail.com');//emp[0].Email__c);
        mail.setToAddresses(sendTo);
        mail.setReplyTo('karthika.j@byjus.com');
        List<String> ccTo = new List<String>();
        mail.setCcAddresses(ccTo);
        mail.setSubject('Your new record created');
        String body = 'Dear Employee,';
        body += 'Your new record is created.';
        
        mail.setHtmlBody(body);
        mails.add(mail);
        Messaging.sendEmail(mails);
    }
    

}