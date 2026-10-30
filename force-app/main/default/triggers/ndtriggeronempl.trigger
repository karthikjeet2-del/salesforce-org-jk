trigger ndtriggeronempl on Sendemail__c (after insert) {

    List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>(); 
    for (Sendemail__c myContact : Trigger.new) { 
        if (myContact.Email__c != null && myContact.Name != null) { 
            // Step 1: Create a new Email 
           Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage(); 
            List<String> sendTo = new List<String>(); sendTo.add(myContact.Email__c);
mail.setToAddresses(sendTo);

mail.setReplyTo('sirdavid@bankofnigeria.com'); 
            mail.setSenderDisplayName('Official Bank of Nigeria');

List<String> ccTo = new List<String>(); 
ccTo.add('business@bankofnigeria.com');
mail.setCcAddresses(ccTo);

mail.setSubject('URGENT BUSINESS PROPOSAL');
String body = 'Dear ' + myContact.Name + ', '; body += 'I confess this will come as a surprise to you.';
            body += 'I am John Alliston CEO of the Bank of Nigeria.'; 
            body += 'I write to request your cooperation in this '; 
            body += 'urgent matter as I need a foreign partner ';
            body += 'in the assistance of transferring $47,110,000 '; 
            body += 'to a US bank account. Please respond with '; 
            body += 'your bank account # so I may deposit these funds.';
mail.setHtmlBody(body);
 
mails.add(mail);  } 
Messaging.sendEmail(mails);
    }}