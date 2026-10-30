import { LightningElement,track } from 'lwc';

export default class ParentComponent extends LightningElement {
nameVal='JK';
childname;
displaychild;
handleNameChange(event){

    this.nameVal = event.target.value;
}
handleEventdetails(event){
 this.childname = event.target.value;
 
 if(this.childname !== '' || this.childname !== null){
    this.displaychild=true;
 }
}
}