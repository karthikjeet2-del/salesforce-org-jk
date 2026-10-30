@istest
public class DailyLeadProcessorTest {

    @istest static void methodToTest(){

        List<Lead> leadList=new List<Lead>();
        for(Integer i=0;i<200;i++){
            Lead ll = new Lead();
            ll.LastName='Test'+i;
            ll.Company='Company'+i;
            LL.LeadSource ='';
            leadList.add(ll);
        }
        Test.startTest();
        insert leadList;
        String jobId = system.schedule('DailyLeadProcessor','0 1 * * * ?', new DailyLeadProcessor());
        Test.stopTest();
    }
}