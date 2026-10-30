import { LightningElement,track } from 'lwc';

export default class RenderedCallbackComponent extends LightningElement {
    @track myName = {firstname : 'Karthik',lastname:'J'};
    count = 0;
    hasrendered = true;
   renderedCallback(){
    console.log('Here I am Inside renderedCallback--->');
   } 
   handleButtonClick(){
   this.count++;
  // this.myName.firstname = 'Resilient'+this.count;
   console.log('this.myName>>'+JSON.stringify(this.myName));
   
   }
}