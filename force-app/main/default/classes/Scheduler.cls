global class Scheduler implements Schedulable {
    global void execute(SchedulableContext sc){
        reminder r=new reminder();
        r.mailreminder();
    }
}