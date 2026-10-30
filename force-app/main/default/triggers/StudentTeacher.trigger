trigger StudentTeacher on Student1__c (after insert,after update) {
    Student1__c s=[select id,Student1name__c,Trainings__c from Student1__c where id=:Trigger.new];
    if(Trigger.IsInsert){
        if(s.Trainings__c=='salesforce'){
         Teacher1__c t=[select id,Know_salesforce__c from Teacher1__c where id=:s.Student1name__c];
            t.Know_salesforce__c=TRUE;
            update t;
    }
 }
}