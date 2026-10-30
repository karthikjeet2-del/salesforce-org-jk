public class EmployeeclassicApex{
public  Employee__c Emp{get;set;} 
    // public List<Employee__c> Emp {get;set;}
    public ApexPages.StandardController controller;
    
    public EmployeeclassicApex(ApexPages.StandardController stdController){
        this.controller = controller;
        system.debug('inside emp');
        
        String Idemp =  ApexPages.CurrentPage().getparameters().get('Empid');
        system.debug('id>>>'+Idemp);
        if(Idemp != null){
            Emp= [Select id,Employee_name__c,Name,Phone_No__c from Employee__c  where id =:Idemp];
            system.debug('Employee>>>>'+Emp);
        }
        else{
            Emp = new Employee__c();
        }
        
        system.debug('Employee>>>>'+Emp);
    }
    public PageReference redirect() {
        insert Emp;
        PageReference pageRefer = new PageReference('/apex/Employeeclassic');
        pageRefer.setRedirect(true);
        //for(Employee__c e:Emp)
        pageRefer.getParameters().put('Empid',Emp.Id);
        return pageRefer;
       // return Page.nexttovfpage;
    }
}