public class Fullinsert1 {
    public static void seperatekeyvalue(){
        Map<id,List<Contact>> ConAccMapsep = Fullinsert.maptowrapper();
        system.debug('ConAccMapsep>>'+ConAccMapsep);
        List<id> key1=new  List<id>();
        List<contact> value1=new  List<contact>();
        system.debug('ConAccMapsep>>'+ConAccMapsep);
        for (id key : ConAccMapsep.keySet()) {
             key1.add(key);
            value1=ConAccMapsep.get(key);
        }
        system.debug('key1>>'+key1);
        system.debug('value1>>'+value1);
        }
}