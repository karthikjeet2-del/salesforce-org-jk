import { LightningElement,api,wire } from 'lwc';
import FIRSTNAME  from '@salesforce/schema/Lead.Name';
import STATUS  from '@salesforce/schema/Lead.Status';
import INDUSRY  from '@salesforce/schema/Lead.Industry';
import LEADSOURCE  from '@salesforce/schema/Lead.LeadSource';
import PHONE  from '@salesforce/schema/Lead.Phone';
//import classMethod from '';
//import {messagecontext,publish} from 'lightning/messageservice';
//import message_file from 'lightning/messageChnannel/test__c';
export default class RecordForm1 extends LightningElement {

    fields={firstname:FIRSTNAME,indutry:INDUSRY,leadsource:LEADSOURCE,phone:PHONE,status:STATUS};
    objectApiName = 'Lead';
    @api recordId;

    /*handleSubmit(event){
     console.log('event>>>>>.'+event.detail.fields);
    }

    @wire(classMethod,{recordId : '$recordId'})
     wiredProp;
     @wire(classMethod,{recordId : '$recordId'})
     wiredFunction({error,data}){
     if(data){

     }
     else if(error){}
    }
    handleSaveData(event){
     className({data: event.detail.value})
     .then(result=>{

     })
     .catch(error=>{

     })
    }

 @wire(messagecontext)
 messagecontext;
 payload;
 handleChange(){
    this.payload = {data1: this.data,data2:this.data2};
    publish(messagecontext,message_file , payload);
 }*/
}