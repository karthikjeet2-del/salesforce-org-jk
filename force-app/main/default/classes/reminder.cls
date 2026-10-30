public class reminder {
        public  void mailreminder(){
        Date d = System.today();
        Datetime dt = (DateTime)d;
            system.debug('dt>>'+dt);
        String dayOfWeek = dt.format('EEEE');
        system.debug('dayOfWeek>>>'+dayOfWeek);
        string[] tobcc=new string[]{};
        Date day=system.today();
        Date threeday=day.addDays(-3);
        Date Fiveday=day.addDays(-5);//threeday.addDays(-2);
      
        System.debug('today>>'+day);
        System.debug('today3>>'+threeday);System.debug('today5>>'+Fiveday); 
        
        if(dayOfWeek.equalsIgnoreCase('monday')||dayOfWeek.equalsIgnoreCase('tuesday')||dayOfWeek.equalsIgnoreCase('wednesday')){
                List <Timesheet__c> emp =[select Employee_Id__r.Email__c,Name from Timesheet__c where  Effort_date__c>:Fiveday and Effort_date__c<:day];
                for(Timesheet__c e:emp){
                    if(e.Name=='null'){
                        tobcc.add(e.Employee_Id__r.Email__c);
                        System.debug('email>>'+tobcc);
                       }
                     }
           
                  }
        
        else if(dayOfWeek.equalsIgnoreCase('thursday')||dayOfWeek.equalsIgnoreCase('friday')){
             System.debug('here');
            date t=system.today();
             List <Timesheet__c> emp =[select Employee_Id__r.Email__c,Effort_date__c,Name from Timesheet__c where Effort_date__c<:day AND Effort_date__c>:threeday ];
           System.debug('details>>++'+emp);
                for(Timesheet__c e:emp){
                 System.debug('detailsrwertr>>++'+e.Name);   
                if(e.Name==null){
                     System.debug('dfgjfggf');
                    tobcc.add(e.Employee_Id__r.Email__c);
                    System.debug('email>>=='+tobcc);
                }
              }
            }
        
       Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
       string[] ccAddresses=new  string[]{'karthik@dispostable.com'};
       message.setToAddresses(tobcc);
        message.optOutPolicy = 'FILTER';
        message.setSubject('Please fill your Timesheet.');
        message.setSenderDisplayName('Sudhir dakshinamurthy');
        message.setccAddresses(ccAddresses);
        String bodystr= '';
        bodystr+='<html><body>hi,'+'<br><br>'+'You are not fill the timesheet from past 3 days please fill the timesheet by the end of the day'+'<br><br>'+'Thanks'+'<br>'+'Support Team';
        message.setHTMLBody(bodyStr); 
        Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
        if (results[0].success) {
            System.debug('The email was sent successfully.');
           } 
        else {
            System.debug('The email failed to send: '
                         + results[0].errors[0].message);
             }
 }
}