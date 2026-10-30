import { LightningElement } from 'lwc';

export default class ReusableParentComponent extends LightningElement {
   label;
   objectName;
   connectedCallback(){
      this.label= 'Account Name';
      this.objectName = 'Account';
   }

}