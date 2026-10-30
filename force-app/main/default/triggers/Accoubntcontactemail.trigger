trigger Accoubntcontactemail on Account (after insert) {
Account acc = [select id,Name,AccountNumber,Site,phone from Account where id =: Trigger.New];
   Contact c1 = new Contact();
        c1.LastName = acc.Name;
        c1.Email = acc.Name+'@gmail.com';
        c1.AccountId = acc.Id;
        insert c1; 
    string s1=c1.LastName;
    string s2=s1.reverse();
        K2__c k=new K2__c();
         k.Email__c=c1.Id;
         k.Name=acc.Name;
        k.username__c=s2+'@gmail.com';
    
      insert k;
    
}