public without sharing class viewtimesheetdata {
    
    @AuraEnabled
    public static ContactDataTableWrapper getDetails(date d1,date d2,Integer pageNumber, Integer pageSize){
        if(d1 != null && d2 != null){
           /* //Date dateFromInput = date.today();
            //  String s1 = String.valueOf(d1);
            //String s2 = String.valueOf(d2);
            //String s3 = s1.right(3).substring(1, 3);
            //String s4 = s2.right(3).substring(1, 3);
            String s5 = String.valueOf(d1).right(5).substring(0, 2);
            String s6 = String.valueOf(d2).right(5).substring(0, 2);
            //Integer i1=integer.ValueOf(s3);
            // Integer i2=integer.ValueOf(s4);
            if( s5.equals(s6)){*/
                //Offset for SOQL
                Integer offset = (pageNumber - 1) * pageSize;
                
                //Total Records
                Integer totalRecords = [SELECT COUNT() FROM Timesheet__c where Employee_Id__c=:'a0D5g0000015rYqEAI'];
                Integer recordEnd = pageSize * pageNumber;
                ContactDataTableWrapper wrap = new ContactDataTableWrapper();
                wrap.pageSize = pageSize;
                wrap.pageNumber = pageNumber;
                wrap.recordStart = offset + 1;
                wrap.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
                wrap.totalRecords = totalRecords;
                wrap.timeList =  [select Effort_date__c,Effort_time__c,Task__c,Billable_Type__c,Project_name__r.Project_Name__c,Description__c from Timesheet__c where Effort_date__c>=:d1 and Effort_date__c<=:d2 and Employee_Id__c=:'a0D5g0000015rYqEAI' ORDER BY Effort_date__c desc LIMIT :pageSize OFFSET :offset];
                return wrap;
           // }
        }
        return null;
    }
    
    public class ContactDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<Timesheet__c> timeList {get;set;}
    }
}