public class DailyLeadProcessor implements Schedulable {
    
    public void execute(SchedulableContext sc){
     List<Lead> leadList = new List<Lead>();
        for(Lead leadRecord : [Select Id,leadsource from Lead where leadsource= null]){
           leadRecord.leadsource='Dreamforce';
            leadList.add(leadRecord);
        }
        if(leadList.size()>0){
            update leadList;
        }

}
}