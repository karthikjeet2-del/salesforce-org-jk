@istest(seealldata=true)
public class LeadProcessorTest {
 
    @istest static void temethod1(){
        system.debug('iuewriuegf=>'+[select id,Product2Id  from OpportunityLineItem limit 2]);
       /* List<Lead> leadList = new List<Lead>();
        for(integer i=0;i<200;i++){
            Lead l = new Lead();
            l.LastName='Testy'+i;
            l.LeadSource='Test'+i;
            l.Company='Jk'+i;
            leadList.add(l);
        }
        if(leadList.size()>0){
            insert leadList;
        }
        LeadProcessor instance = new LeadProcessor();
        Database.executeBatch(instance);*/
    }
    
    @istest static void testmethod1(){
        
        Userrole ur = new Userrole();
        ur.Name = 'TYest role';
        insert ur;
        /*Profile p = [SELECT Id FROm Profile WHERE Name ='System Administrator'];
        User u1 = new User();
        u1.LastName = 'Test';
        u1.profileId = p.Id;
        u1.Username = 'Teuustkk@gmail.com';
        u1.Email='Testkk@gmail.com';
        u1.Alias = 'tk';
        u1.languagelocalekey = 'en_US';
        u1.emailencodingkey = 'UTF-8';
        u1.timezonesidkey = 'Europe/London';
        u1.localesidkey = 'en_GB';
        //, TimeZoneSidKey, LocaleSidKey, EmailEncodingKey, LanguageLocaleKey
        insert u1;*/
        
        Account acc = new Account();
        acc.Name = 'Test1234';
        insert acc;
    }
}