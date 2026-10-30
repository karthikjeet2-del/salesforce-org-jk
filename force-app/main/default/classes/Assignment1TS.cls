public class Assignment1TS {
    public static void teacherStudent(){
        Teacher1__c t1 = new Teacher1__c();
        t1.Name = 'Chandana';
        insert t1;
        System.debug('t1>>'+t1);
        
        Student1__c s1 = new Student1__c();
        s1.Name = 'karthik';
        s1.RollNO__c=1;
        s1.Percentage__c=75;
        s1.Phone_NO__c='7019021890';
        s1.Address__c='Shimoga,KA';
        s1.Student1name__c=t1.Id;
        insert s1;
        System.debug('s1>>'+s1);
        
        Student1__c s2 = new Student1__c();
        s2.Name = 'Nayana';
        s2.RollNO__c=2;
        s2.Percentage__c=89;
        s2.Phone_NO__c='123456789';
        s2.Address__c='Hasan,KA';
        s2.Student1name__c=t1.Id;
        insert s2;
        System.debug('s2>>'+s2);
        
        Student1__c s3 = new Student1__c();
        s3.Name = 'krishna';
        s3.RollNO__c=3;
        s3.Percentage__c=90;
        s3.Phone_NO__c='987654321';
        s3.Address__c='Gujrat';
        s3.Student1name__c=t1.Id;
        insert s3;
        System.debug('s3>>'+s3);
        
        /*Contact c2 = new Contact();
c2.LastName = s2+'2';
c2.AccountId = a1.Id;
insert c2;
System.debug('c2>>'+c2);

K2__c k1 = new K2__c();
k1.Name = c1.LastName+'K';
k1.Email__c = c1.Id;
k1.username__c=a1.Name+'1'+'@gmail.com';
insert k1;
System.debug('k1>>'+k1);

K2__c k2 = new K2__c();
k2.Name = c2.LastName+'K';
k2.Email__c = c2.Id;
k2.username__c=a1.Name+'2'+'@gmail.com';
insert k2;
System.debug('k2>>'+k2);*/
        
        
        
    }
}