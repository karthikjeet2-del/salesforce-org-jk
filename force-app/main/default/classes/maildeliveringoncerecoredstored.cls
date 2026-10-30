public class maildeliveringoncerecoredstored {
    public static void send(){
       // List<Timesheet__c> t1=[select Name,Description__c,Effort_date__c,Effort_time__c from Timesheet__c];
        //Employee__c t2=[select Name,Email__c,Employee_name__c,Tokens__c from Employee__c];
        //Project__c t3=[select Name,Project_Name__c,Status__c from Project__c];
       // System.debug('t1>>'+t1);
        //System.debug('t1>>'+t2);
        //System.debug('t1>>'+t3);
       List<Messaging.SingleEmailMessage> mails = 
        new List<Messaging.SingleEmailMessage>();
        Messaging.SingleEmailMessage mail = 
        new Messaging.SingleEmailMessage();
                       
               String[] sendTo = new String[]{'bhadrakarthik.j@gmail.com'};
               mail.setToAddresses(sendTo);
               mail.setReplyTo('jk@dispostable.com');
               mail.setSenderDisplayName('Karthik');
               mail.setSubject('Timesheet updated...');
               mail.setPlainTextBody('Dear ');//+ Timesheet__c.Name+' you updated your timesheet.');//<br> This is your employee id'+t2.Name +'  and project id  '+t3.Name+',<br> see your task detils below');
               mails.add(mail);
        
        
        
    
           Messaging.sendEmail(mails);
    }}