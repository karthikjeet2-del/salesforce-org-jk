public class AccountController {
  @AuraEnabled(cacheable = true)
    public static Account[] getAccountdata(){
        return [select id,name,phone,Email__c,(select lastname,Email from contacts) from Account order by createddate desc];
    }
    @AuraEnabled(cacheable = true)
    public static Contact getAccountId(String recordId){
      system.debug('recordId>>>'+recordId);
        return [SELECT Id,AccountId FROM Contact WHERE Id =: recordId];
    }
    @AuraEnabled(cacheable=true)
    public static Account getrecordBaseonParams(String input1,String input2){
      try {
         return [SELECT Id,Email__c FROM Account WHERE Name =:input1 AND Phone =:input2];
      } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
      }
    }
    
  /* @AuraEnabled
    public static ContactDataTableWrapper getContactData(Integer pageNumber, Integer pageSize) {
         
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
         
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        Integer recordEnd = pageSize * pageNumber;
 
        //Instance of Contact DataTable Wrapper Class
        ContactDataTableWrapper objDT =  new ContactDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.contactList = [SELECT Id, Name, Phone FROM Contact ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return objDT;
    }
     
    //Wrapper Class For Contact DataTable  
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
        public List<Contact> contactList {get;set;}
    }*/
}