public class newemailtouser {
public static void send(){
   set<id> pro=new set<id>();
    for(Project__c p:[select id from Project__c])
       pro.add(p.id) ;
       List<Timesheet__c> t1=[select Name,Description__c,Effort_date__c,Effort_time__c from Timesheet__c where emailofuser__c='karthik@dispostable.com'];
        List<Employee__c> t2=[select Name,Email__c,Employee_name__c,Tokens__c from Employee__c where Email__c = 'karthik@dispostable.com'];
        List<Project__c> t3=[select Name,Project_Name__c,Status__c from Project__c where  Project_Name__c='stapp' ];
       System.debug('t1>>'+t1);
        System.debug('t1>>'+t2);
        System.debug('t1>>'+t3);
       List<Messaging.SingleEmailMessage> mails = 
        new List<Messaging.SingleEmailMessage>();
        Messaging.SingleEmailMessage mail = 
        new Messaging.SingleEmailMessage();
                       
               String[] sendTo = new String[]{'bhadrakarthik.j@gmail.com'};
               mail.setToAddresses(sendTo);
               mail.setReplyTo('jk@dispostable.com');
               mail.setSenderDisplayName('Karthik');
               mail.setSubject('Timesheet updated...');
               mail.setPlainTextBody('Dear ' );//+ t2.Employee_name__c+'you updated your timesheet.<br> This is your employee id'+t2.Name +'  and project id  '+t3.Name+',<br> see your task detils below');
               mails.add(mail);
        
        
        
    
           Messaging.sendEmail(mails);
    }}