public class bookHandler {
    public Book__c bookRec{get;set;}
    public bookHandler(ApexPages.StandardController controller){
        this.bookRec= (Book__c)controller.getRecord();
        String bookid = ApexPages.CurrentPage().getparameters().get('id');
        if(bookid != null){
            bookRec =[Select id,name,book_genre__c from Book__c where id=:bookid]; 
        }
        else{
            bookRec = new book__c(); 
        }
    }
    public PageReference saveRecord(){
        insert bookRec;  
        return new PageReference('/' +bookRec.Id);
        
    }
    @auraenabled
    public static List<Book__c> topSellingFiveBooks(){
        return [SELECT Id,Name FROM Book__c order by createddate  limit 5];
    }
}