import { LightningElement,wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class UiRecordAPI extends LightningElement {
    fields={LastName:'',Company:''};
    
    handleName(event){
    this.fields.LastName = event.detail.value;
    }
    handleComapny(event){
        this.fields.Company = event.detail.value;
        }
    handleCreate(){
        console.log('Herere');
        
       const recordInput = { apiName: 'Lead', fields:this.fields };
        console.log('recordInput>'+JSON.stringify(recordInput))
        createRecord({ apiName: 'Lead', fields:this.fields })
        .then(result=>{
            console.log('result>>'+JSON.stringify(result));
              this.dispatchEvent(new ShowToastEvent({
              title: 'Account created',
              message: 'Account created successfully',
              variant: 'success',
            }));
          })
          .catch(error=>{
          console.log(JSON.stringify(error))
          });
    }
}