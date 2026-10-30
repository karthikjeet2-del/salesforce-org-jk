public class ScheduleJobGCheck implements Schedulable{

    public void execute(SchedulableContext sc){
        for(Integer i; i<200; i++){
            Account accList = [SELECT ID FROM Account];
        }
    }
    
}