trigger Sendemailtrigger on Sendemail__c (after insert) {

  List<Messaging.SingleEmailMessage> mails = 
  new List<Messaging.SingleEmailMessage>();
  
  for (Sendemail__c myContact : Trigger.new) {
    if (myContact.Email__c != null && myContact.Name != null) {
     
      Messaging.SingleEmailMessage mail = 
      new Messaging.SingleEmailMessage();
        String timedata ='00:45:00.000Z';
List<String> timehere = timedata.split(':');


    
   
      List<String> sendTo = new List<String>();
      sendTo.add(myContact.Email__c);
        sendTo.add('chetanbudihal143@gmail.com');
      mail.setToAddresses(sendTo);
    
     
      mail.setReplyTo('jk@dispostable.com');
      mail.setSenderDisplayName('Karthik');
     
    //  String s=myContact.Time__c.format();
        //String s1=s.substring(0,2)+':'+s.substring(2,4)+':'+s.substring(4,6);
  
  
//myContact.Date__c=today()+2;
      mail.setSubject('Confirmation email...');
      String body = 'Dear ' + myContact.Name + '('+myContact.Emp_Id__c+'),';
      body += 'we accept your designation'+' '+myContact.Designation__c+'. ';
      body += 'I like your description . please come on'+' '+myContact.Date__c +'at'+' '+timehere[0]+':'+timehere[1]+':'+timehere[1]+ 'to our office.';
     
     
      mail.setHtmlBody(body);
    
      
      mails.add(mail);
    }
  
  
  Messaging.sendEmail(mails);
  }}