public class nameinsert12 {
    public static void mycus1insert(){
        Mycus1__c b1 = new Mycus1__c();
        b1.Name = 'Rahul';
        insert b1;
        System.debug('b1>>'+b1);
        }
    public static void mycus2insert(){
        Mycus2__c b2 = new Mycus2__c();
        b2.Name = 'Ramesh';
        insert b2;
        System.debug('b2>>'+b2);
        }
}