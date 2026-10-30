import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
  connectedCallback() {
    this.sfdcBaseURL = window.location.origin;
    console.log('this.sfdcBaseURL>>'+this.sfdcBaseURL);
}
}