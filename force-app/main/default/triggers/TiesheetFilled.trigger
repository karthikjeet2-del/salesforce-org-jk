trigger TiesheetFilled on Timesheet__c (after insert,after update) {

    set<id> myset = new set<id>();
    map<Id,Timesheet__c> timedata=new map<Id,Timesheet__c>();
    list<Employee__c> empdata=new list<Employee__c>();
    for(Timesheet__c time1:trigger.new){
      timedata.put(time1.Employee_Id__c,time1);  
        myset.add(time1.Employee_Id__c);
    }
    if(myset.size()>0){
        for(Employee__c emp:[select id,Timesheet_Filled__c from Employee__c where id in:myset]){
            if(timedata.containsKey(emp.id)){
                if(timedata.get(emp.id).Name!=null){
                    emp.Timesheet_Filled__c=TRUE;
                    empdata.add(emp);
                }
                else{
                      emp.Timesheet_Filled__c = FALSE;
                        empdata.add(emp); 
                    }
            }
        }
    }
    if(empdata.size()>0){
        update empdata;
    } 
}