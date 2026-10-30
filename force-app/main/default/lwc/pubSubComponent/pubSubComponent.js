import { LightningElement,wire } from 'lwc';
import {subscribe,MessageContext} from 'lightning/messageService';
import COUNT from '@salesforce/messageChannel/test__c';
export default class PubSubComponent extends LightningElement {
    
    subscription = null;
    operator;
    constant;
    @wire(MessageContext)
    messageContext;
    
    handlesubscription(){
        console.log('Dude inside subscription');
        this.subscription = subscribe(this.messageContext,COUNT,
              (message)=>this.getValues(message));
    }
    getValues(message){
    this.operator = message.operator;
    this.constant = message.constant; 
    this.subscription = null;
    }
    connectedCallback(){
        console.log('Dude inside subscription');
        this.handlesubscription();
    }
   
}