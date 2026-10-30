import { LightningElement,api } from 'lwc';
import getData from '@salesforce/apex/PaginationHandler.getData';
export default class PaginationLwc extends LightningElement {

@api column = [
    {label:'Account Name',fieldName:'Name', type:'text'},
    {label:'Email',fieldName:'Email__c',type:'Email'},
    {label:'Industry',fieldNmae:'Industry',type:'text'},
];
error;
data=[];
offset = 0;
rowlimit = 5;
connectedCallback(){
    console.log('FROm connectedCallback');
    this.loadData();
    
  }
  loadData(){
     getData({rowLimit : this.rowlimit, offSet : this.offset})
    .then(result=>{
        console.log('result=>>>'+JSON.stringify(result));
        let updatedData = [...this.data , ...result];
        this.data = updatedData;
        this.error = undefined;
    })
    .catch(error=>{
        this.error = error;
        this.data = undefined;
        console.log('error=>>>'+JSON.stringify(this.error));
        
    });
  }
loadmoredata(event){
    console.log('FROM Loadmore');
    const currentRecord = this.data;
        const { target } = event;
        target.isLoading = true;

        this.offset = this.offset + this.rowlimit;
        this.loadData()
            .then(()=> {
                target.isLoading = false;
            });
}
}