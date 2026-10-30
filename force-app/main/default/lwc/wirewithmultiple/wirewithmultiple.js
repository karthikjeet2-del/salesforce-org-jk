import { LightningElement,wire,api,track } from 'lwc';
import getrecordBaseonParams from '@salesforce/apex/AccountController.getrecordBaseonParams';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class Wirewithmultiple extends LightningElement {
@track input1 = 'Karthik';
@track input2 = '7019021890';
accountData;
@wire(getrecordBaseonParams,{input1 :'$input1',input2 : '$input2'})
wiredMethod({error,data}){
    if(data){
    console.log('data>>>>'+JSON.stringify(data));
    this.accountData = data;
    }
    else if(error){
        console.log('myerror>>>>'+JSON.stringify(error));
        this.accountData  = null;
        const event = new ShowToastEvent({
            title:'Error',
            message:"There is no Email associated with the entered Account Name and phone",
            variant :'Error',
            mode:'dissmisable'

        });
     this.dispatchEvent(event);
    }
}
connectedCallback(){
    getrecordBaseonParams({input1 :this.input1,input2 : this.input2 })
    .then(response=>{
    console.log('INSIDE CONNECTED CALLBACK'+response.Email__c);
    }) 
    .catch(error=>{

    })
}
handleNamechange(event){
    this.input1 = event.target.value;
}
handlePhonechange(event){
    this.input2 = event.target.value; 
}
}