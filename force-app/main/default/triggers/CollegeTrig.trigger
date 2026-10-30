trigger CollegeTrig on College__c (after update) {
    
    List<College__c> cData=trigger.new;
    System.debug('cData>>'+cData);
    List<Department__c> dData=[select Total_Students__c,(select Total_Students__c from Subjects__r) from Department__c];
    System.debug('dData>>'+dData);
    if(cData.size()>0 && dData.size()>0){
        for(College__c c:cData){
        if(c.Record_Number__c=='1') dData[0].Total_Students__c+=50;
        else if(c.Record_Number__c=='2')dData[1].Total_Students__c+=60;
        else if(c.Record_Number__c=='3')dData[2].Total_Students__c+=70;
        system.debug('dData>'+dData);
         update dData;
    }
    }
}