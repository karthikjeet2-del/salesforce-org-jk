import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import CONTACT1 from '@salesforce/schema/Case.Payment__r.Contact_No1__c';
import CONTACT2 from '@salesforce/schema/Case.Payment__r.Contact_No2__c';
import CONTACT3 from '@salesforce/schema/Case.Payment__r.Contact_No3__c';
export default class GetAcconCon extends LightningElement {
@api recordId;
 results={}
   @wire(getRecord, { recordId: '$recordId', fields: [CONTACT1,CONTACT2,CONTACT3]})
    wirerecord({ data, error }) {
        if (data) {
           const { fields }=data
           Object.keys(fields).forEach(item=>{
               let value=fields[item]&& (fields[item].displayvalue!=null) ? fields[item].displayvalue:fields[item].value
               this.results= {...this.results,[item]: value}
           })
         console.log(JSON.stringify(data)); 
        } else if (error) {
            console.log("Error");
        }
    }

}