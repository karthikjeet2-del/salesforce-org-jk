public class Sendemailtouser {
   public  static void SendEmail() {
       
       Timesheet__c et2=[select Name,Effort_date__c,Description__c,Effort_time__c,Employee_Id__r.Employee_name__c,Project_name__r.Project_name__c from Timesheet__c ]; 
             system.debug('et2>>>>'+et2);
      
      String s = String.valueof(et2.Effort_date__c);
       Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
    
       string[] tobcc=new string[]{'karthik@dispostable.com'};
       message.setToAddresses(tobcc);
       message.optOutPolicy = 'FILTER';
       message.setSubject('Timesheet updated...!!!');
       message.setSenderDisplayName('Sudhir dakshinamurthy');
       message.setReplyTo('bhadrakarthik.j@gmail.com');
       String tableStr = '';
       tableStr += '<table border="1" style="border-collapse: collapse">';
       tableStr  +='<tr><th>TS number</th>'+/*<th>Name</th>*/'<th>Date</th><th>EMP ID</th><th>Project ID</th><th>Discription</th>';
       tableStr  +='<tr><td>'+et2.Name+'</td><td>'+s+'</td><td>'+et2.Employee_Id__c+'</td><td>'+et2.Project_name__r.Project_name__c+' </td>';
       tableStr +='<td>'+et2.Description__c+'</td></tr></table>';     
            
       String bodystr= '';
       bodystr+='<html><body>Dear ' + et2.Employee_Id__r.Employee_name__c+ ', ' +'<br><br>'+
                'You have updated your timesheet and the details you entered is given below <br><br>'+tableStr+'<br><br>'+'This is system generated mail and please do not reply to this mail.';
       System.debug('bodystr>>'+bodystr);
       message.setHTMLBody(bodyStr); 
       //message.setplainTextBody(tableStr) ;
        
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