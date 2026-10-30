import { LightningElement,api } from 'lwc';
import getAccountDetails from '@salesforce/apex/ApexSharingClass.getAccountDetails';
export default class ApexSharingComponent extends LightningElement {
    @api columns=[
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Account Number', fieldName: 'AccountNumber' }
    ]
    AccountData;
    connectedCallback(){
        getAccountDetails({ })
        .then(result=>{
            this.AccountData=result;
        })
        .catch(error=>{
            console.log(error);
        })
    }

}