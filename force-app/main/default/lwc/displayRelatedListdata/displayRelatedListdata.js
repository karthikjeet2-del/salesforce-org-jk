import { LightningElement,wire,api} from 'lwc';
import displayRelatedBooks from '@salesforce/apex/displayRelatedData.displayRelatedBooks';
import { NavigationMixin } from 'lightning/navigation';
export default class DisplayRelatedListdata extends  NavigationMixin(LightningElement){
    @api column =[{label :'Book Name' , fieldName : 'Name',type: 'text' }];
    @api recordId;
    booksData;
    @wire(displayRelatedBooks,{accountId : '$recordId'})
    wiredBooksData({data,error}){
    if(data){
     console.log('data>>>'+JSON.stringify(data));
     this.booksData = data;
    }
    else if(error){
        console.log('error>>>'+error);
    }
}
@api
refreshComponent(){
    console.log('heree');
    //eval("$A.get('e.force:refreshView').fire();")
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.recordId,
            objectApiName: 'Account',
            actionName: 'view'
         },
    });
    //window.location.reload();
    /*displayRelatedBooks({accountId :accountId })
    .then(result=>{
        console.log('data>>>444'+JSON.stringify(data));
        this.booksData = data; 
        window.location.reload();
    })
    .catch(error=>{
        console.log('error>>>'+error);
    })*/
    

  }
}