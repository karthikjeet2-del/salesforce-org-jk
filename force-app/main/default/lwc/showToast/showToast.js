import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ShowToast extends LightningElement {

    handleClick(){
         const event = new ShowToastEvent({
            title :'Error',
            message : 'I am error /n Here I am multi line',
            mode : 'dismissible',
            /*messageData : [
                { url,
                label:'I am here'
            }],*/
            variant :'error'
            });
            this.dispatchEvent(event);
    }
}