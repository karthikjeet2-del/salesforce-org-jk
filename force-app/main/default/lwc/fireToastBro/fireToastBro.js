import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FireToastBro extends LightningElement {

    handleFireClick(){
        const event = new ShowToastEvent({
            title : "Fire",
            message : "I am burning with undomitable fire inside me!",
            variant : "Error",
            mode : "dismissable"
        });
       this.dispatchEvent(event); 
    }
    handleFocus(event){
    console.log('>>>>>'+event.detail);
    }
}