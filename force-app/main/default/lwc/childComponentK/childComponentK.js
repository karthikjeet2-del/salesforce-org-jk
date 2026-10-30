import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
   @api parentname; 
   childName;
   handleChildName(event){
    this.childName = event.target.value;

    const storeEvent = new CustomEvent('myevent', {detail:this.childName});
    this.dispatchEvent(storeEvent);
    
   }
}