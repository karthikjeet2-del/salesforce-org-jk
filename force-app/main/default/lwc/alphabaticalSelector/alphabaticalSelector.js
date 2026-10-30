import { LightningElement,track,api} from 'lwc';
import AlphabetLabel from '@salesforce/label/c.Alphabets';
import getAccountData from '@salesforce/apex/AlphbetController.getAccountData'
export default class AlphabaticalSelector extends LightningElement {
 @api columns =  [
    { label: 'Name', fieldName: 'Name',type: "url",typeAttributes: { label: { fieldName: "Name" }, tooltip:"Name", target: "_self" }},
    { label: 'Email', fieldName: 'Email__c',type:'email'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
 ];
 AlphabetsArr={id:'', value:''}
 AlphbetsHolder = AlphabetLabel.split(',');
 AccountDataList;
 @track displayText;
 @track itemdata;
 clickHandler(event){
   let query ='select id,Name,Phone,Email__C from Account where Name like '+"'"+event.target.value+'%'+"'";
   console.log('query'+query);
   getAccountData({query:query})
   .then(result=>{
       console.log('result'+JSON.stringify(result));
       this.AccountDataList=result;
       this.displayText=true;
   })
   .then(error=>{
       console.log(error);
   })
 }
}