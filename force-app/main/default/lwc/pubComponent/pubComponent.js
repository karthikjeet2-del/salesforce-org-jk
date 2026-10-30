import { LightningElement,wire } from 'lwc';
import {publish,MessageContext} from 'lightning/messageService';
import COUNT from '@salesforce/messageChannel/test__c';

export default class PubComponent extends LightningElement {
  
  @wire(MessageContext,{})
  messagecontext;
 connectedCallback(){
    console.log('Dude I can copy that');
 }
  handleChange(event){
    console.log('DudeI am here'+ event.target.value);
    const payload = {
        operator:'+',
        constant: event.target.value
    };
    publish(this.messagecontext,COUNT,payload);
  }
}