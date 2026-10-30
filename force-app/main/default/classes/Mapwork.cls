public class Mapwork {
     public static void Mapwork1(){
        Map<string,string> Map1=new  Map<string,string>{'1'=>'abc','2'=>'bcd','3'=>'cde'};
        Map<string,string> Map2=new Map<string,string>{'abc'=>'L','bcd'=>'M','cde'=>'N','efg'=>'O'};
        Map<string,string> Map3=new Map<string,string>();
         //To add keys of Map1 as a value and values of map2 as a key tp map3
         /* if(Map1.size()>0 && Map2.size()>0){
              for(string m2: Map2.keyset()){ 
                   for(string m1: Map1.keyset()){
                        if(m2==Map1.get(m1)){
                          Map3.put(Map2.get(m2),m1);  
                        }}
                }
          }
          system.debug('MY map>>>>>>>>'+Map3);*/
         set<string> myset=new set<string>();
         myset.addAll(Map1.values());
         myset.addAll(Map2.keyset());
         system.debug('>>>>>'+myset);
         for(string s:myset){
             if(Map2.get(s)!=null )
                  Map3.put(s,Map2.get(s));
             }
         
         system.debug('MY map>>>>>>>>'+Map3);
     }
}