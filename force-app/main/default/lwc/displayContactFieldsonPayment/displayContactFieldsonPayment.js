import { LightningElement, track, wire, api } from 'lwc';
//import getContactsRelatedToAccount from 
//'@salesforce/apex/displayAccController.getContactsRelatedToAccount';

export default class displayContactFieldsonPayment extends LightningElement {
 // @api objectApiName;
 @api recordId;
  @api recordId1;

    /*@wire(getContactsRelatedToAccount, {accId: '$recordId'}) 
    WireContactRecords({error, data}){
        console.log('this is fucking data from aPex'+data);
        if(data !=null){
            this.recordId1 = data;
            this.error = undefined;
            
        }else{
            this.error = error;
            this.recordId1 = undefined;
        }
        console.log('fsdjfajdffsdff>>'+this.recordId1);
     }*/
}