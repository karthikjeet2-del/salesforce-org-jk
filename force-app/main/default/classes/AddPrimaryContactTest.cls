@isTest public class AddPrimaryContactTest  {      
    
    @isTest static void TestList()      {          
        
        List<Account> accs = new List <Account>();          
        
        for(Integer i=0;i<50;i++)          {              
            
            accs .add(new Account(BillingState = 'CA', name = 'Test'+i));         
            
        }          
        
        for(Integer j=0;j<50;j++)          {              
            
            accs .add(new Account(BillingState = 'NY', name = 'Test'+j));          
            
        }         
        
        insert accs ;          
        
        Contact co = new Contact();         
        
        co.FirstName='demo';         
        
        co.LastName ='demo';          
        
        insert co;          
        
        String state = 'CA';                  
        
        AddPrimaryContact apc = new AddPrimaryContact(co, state);           
        
        Test.startTest();             
        
        System.enqueueJob(apc);           
        
        Test.stopTest();       
        
    }  
    @istest static void secondTest(){
        Account acc = new Account(Name='Test2');
        insert acc;
    }

}