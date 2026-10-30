import { LightningElement,api,track } from 'lwc';

export default class CallFlowFromLwc extends LightningElement {

@api recordId;
@track flowApiName = 'Account_Creation';
inputVariables;
 get inputVariables(){
    return {
      name: "AccountId",
        type: "String",
        value: this.recordId,
    }
  }
  /*connectedCallback(){
    console.log('recordId>>'+this.recordId);
    this.inputVariables = [
		{
			name: "AccountId",
			type: "String",
			value: this.recordId,
		},
	];
    console.log('inputVariables>>'+JSON.stringify(this.inputVariables));
  }*/
  handleFlow(event){
      console.log('event.detail.value>>'+event.detail.value);
  }
}