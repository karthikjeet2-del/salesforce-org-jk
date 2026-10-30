public class StringArrayTest {
    public static List<String> generateStringArray(Integer length){
      List<string> stringlist=new List<String>();
        for(Integer i=0;i<length;i++){
            stringlist.add('Test '+i);
        }
        return stringlist;
    }
}