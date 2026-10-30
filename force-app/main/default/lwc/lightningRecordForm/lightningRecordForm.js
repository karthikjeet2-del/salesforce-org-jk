import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class LightningRecordForm extends LightningElement {

    @api recordId;
    @api objectApiName ='Account';
    handleSuccess(event){
        const Toastevent = new ShowToastEvent({
            title:'Account Record Created Succesfully!',
            message:'Account Id :' + event.detail.id,
            variant:'success'
        });
        this.dispatchEvent(Toastevent);
    }
}