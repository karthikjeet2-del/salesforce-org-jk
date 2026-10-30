import { LightningElement,track } from 'lwc';
import insertAccountMethod from '@salesforce/apex/displayAccController.insertAccountMethod';
import contactNo from '@salesforce/schema/Contact.Contact_Number__c';


import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class InsertAccountLwc extends LightningElement {
    @track accountid;
    @track error;    
    @track getAccountRecord={
        Name:contactNo,       
       
              
    };   

   
    nameInpChange(event){
       this.getAccountRecord.Contact_Number__c = event.target.value;
       //window.console.log(this.getAccountRecord.Name);
     }

      saveAccountAction(){
        window.console.log('before save' + this.createAccount);
        insertAccountMethod({accountObj:this.getAccountRecord})
        .then(result=>{
          window.console.log(this.createAccount);
            this.getAccountRecord={};
            this.accountid=result.Id;
            window.console.log('after save' + this.accountid);
            
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Account created successfully',
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
           this.error=error.message;
           window.console.log(this.error);
        });
      }
    
    
    }