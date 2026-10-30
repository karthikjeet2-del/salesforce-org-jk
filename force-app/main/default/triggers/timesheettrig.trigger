trigger timesheettrig on Timesheet__c (after insert) {
    
    List<Messaging.SingleEmailMessage> mails = 
    new List<Messaging.SingleEmailMessage>();
   
    for (Timesheet__c record : Trigger.new) {
        if (record.Name != 'null' ) {
            Messaging.SingleEmailMessage mail = 
            new Messaging.SingleEmailMessage();
            Employee__c et=[Select Name,Employee_name__c from Employee__c];
            Project__c et1=[select Name,Project_Name__c,Status__c from Project__c ];
          //  Timesheet__c et2=[select Name,Effort_date__c,Description__c,Employee_Id__c,Effort_time__c,Billable_Type__c,Project_name__c from Timesheet__c]; 
            String s = String.valueof(record.Effort_date__c);
            String[] sendTo = new String[]{'bhadrakarthik.j@gmail.com'};
                //sendTo[i]=record.emailofuser__c;
                //sendTo.add(sendTo);
            mail.setToAddresses(sendTo);
            mail.setReplyTo('jk@dispostable.com');
            mail.setSenderDisplayName('Sudhir dakshinamurthy');
            mail.setSubject('Timesheet updated...!!!');
            String tableStr = '';
            tableStr += '<table border="1" style="border-collapse: collapse">';
            tableStr  +='<tr><th>TS number</th><th>Name</th><th>Date</th><th>EMP ID</th><th>Project ID</th><th>Discription</th>';
            tableStr  +='<tr><td>'+record.Name+'</td><td>'+et.Employee_name__c+'</td><td>'+s+'</td><td>'+et.Name+'</td><td>'+et1.Name+' </td>';
            tableStr +='<td>'+record.Description__c+'</td></tr></table>';     
            
            String bodystr= '';
            bodystr+='<html><body>Dear ' + et.Employee_name__c + ', ' +'<br><br>'+
            'You have updated your timesheet and the details you entered is given below <br><br>'+tableStr+'<br><br>'+'This is system generated mail and please do not reply to this mail.';
            
            mail.setHTMLBody(bodyStr); 
            mails.add(mail);
        }
        else{
            system.debug('error');
        }
    }
    
    Messaging.sendEmail(mails);
    }