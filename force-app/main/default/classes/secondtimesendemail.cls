public class secondtimesendemail {
   public static void SendEmail() {
       /*List<contact> lstcon=[Select id from contact limit 2];
       List<Id> lstids= new List<Id>();
       for(Contact c:lstcon) {
           lstids.add(c.id);
       }*/
       //System.debug('lll>>>'+lstids);
       list<employee__c> et=[Select id from employee__c where name = 'karthik' limit 1];
       system.debug('et>>>>'+et);
     //  system.debug('et.id>>>>'+et.id);
       
       Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
       // Set recipients to two contact IDs.
       // Replace IDs with valid record IDs in your org.0035g000003a0e4AAA, 0035g000003a0e5AAA
       
       //message.toAddresses = new String[] { '0035g000003a0e4AAA', '0035g000003a0e5AAA' };
       message.toAddresses = new String[] { 'bhadrakarthik.j@gmail.com', 'asd@dispostable.com' };
           system.debug('here'+message.toAddresses);
       message.optOutPolicy = 'FILTER';
       message.subject = 'Opt Out Test Message';
       message.plainTextBody = 'This is the message body.';
       Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
           Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
       if (results[0].success) {
           System.debug('The email was sent successfully.');
       } else {
           System.debug('The email failed to send: '
                        + results[0].errors[0].message);
       }
       
       
   }}