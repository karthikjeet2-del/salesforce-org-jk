public class SamsaraInterviewPracticeClass {

    
    
    public void method1(){
        List<String> arr= new List<String>{'Sales', 'Support', 'Sales', 'Marketing', 'Support', 'Sales'};
            system.debug('arr>'+arr);
        Map<string,Integer> countmap= new Map<string,Integer>();
        for(Integer i=0;i<arr.size();i++ ){
            system.debug('arr>'+arr[i]);
            for(Integer j =1; j<arr.size()-1;j++){
                system.debug('arr>'+arr[j]);
                if(arr[i] == arr[j]){
                 countmap.put(arr[i],j); 
            }
            }
            }
        system.debug('countmap>'+countmap);
    }
    public void method2(){
        Map<string,List<Contact>> mapl = new Map<string,List<Contact>>();
        for(Contact con : [SELECT Id,Name FROM Contact LIMIT 10]){
            mapl.put(con.Id,new List<contact>{con});
        }
        system.debug('mapl>'+mapl);
    }
}