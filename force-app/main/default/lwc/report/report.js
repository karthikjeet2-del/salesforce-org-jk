import { LightningElement, track, wire, api } from 'lwc';
import getContactsRelatedToAccount from 
'@salesforce/apex/displayAccController.getContactsRelatedToAccount';
export default class report extends LightningElement {
   @api recordId;
   @api recordId1;
    
    @wire(getContactsRelatedToAccount, {accId: '$recordId'}) 
    WireContactRecords({error, data}){
        if(data){
            this.recordId1 = data;
            this.error = undefined; 
            
        }else{
            this.error = error;
            this.recordId1 = undefined;
        }
        console.log(this.recordId1);
     }
}