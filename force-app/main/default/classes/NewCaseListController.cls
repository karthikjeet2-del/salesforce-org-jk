public class NewCaseListController {
    

    public List<Case> getNewCases(){
       return [Select id,caseNumber from case where status='New']; 
    }
}