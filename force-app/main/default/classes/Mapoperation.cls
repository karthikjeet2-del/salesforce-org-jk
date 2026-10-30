public class Mapoperation {
    // this method will add keys and values if both maps contains same key.
    public static void Mapwork(){
        Map<integer,string> Map1=new  Map<integer,string>{1=>'abc',2=>'bcd',3=>'cde'};
        Map<integer,string> Map2=new Map<integer,string>{1=>'L',2=>'M',5=>'N'};
        Map<integer,String> Map3=new Map<integer,string>();
        set<Integer> myset=new set<Integer>();
        myset.addAll(Map1.keyset());
        myset.addAll(Map2.keyset());
        for(integer i:myset){
            if(Map2.containskey(i)&&Map1.containskey(i))
                Map3.put(i+i,Map1.get(i)+Map2.get(i));
            else if(Map1.containskey(i))
                map3.put(i,Map1.get(i));
              else if(Map2.containskey(i))
                map3.put(i,Map2.get(i));
        }
        system.debug('>>>>>>>>>'+Map3);
        
     }
    
    
    @invocableMethod(label='TEST')
    public static void methodname(List<sObject> ids){
        
    }
}