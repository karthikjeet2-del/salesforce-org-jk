public class RoundrobinAllocation {
    public static void caseAllocation(){
        string[] associates=NEW string[]{'A','B','C','D','E'};
        Integer[] cases =new Integer[]{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17};
        Map<String, List<Integer>> multiValueMap = new Map<String, List<Integer>>();
        integer count=associates.size();
        system.debug(count);
        Integer j=0;
        for(string str:associates){
          multiValueMap.put(str,new List<Integer>()); 
        }
       // system.debug('multiValueMap1>>>'+multiValueMap);
        for(Integer i=0;i<cases.size();i++){
            if(count!= 0){
                //system.debug('i>>'+i);
               multiValueMap.get(associates[j]).add(cases[i]); 
                //system.debug('multiValueMap.get(associates[j]).add(cases[i])'+multiValueMap);
                count--;
                j++;
                //system.debug('count--'+count+' '+'j++'+j);
            }
            else{
                //system.debug('inside');
            count=associates.size();
            j=0; 
            i--;
           }
         }
        system.debug('multiValueMap2>>>'+multiValueMap);
       }
}