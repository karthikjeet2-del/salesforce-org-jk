import { LightningElement,api } from 'lwc';
import NAME from '@salesforce/schema/Account.Name';
import INDUSRTY from '@salesforce/schema/Account.Industry';
export default class RecordEditForm extends LightningElement {


    objectApiName='Account';
    @api recordId;
    fields =[NAME,INDUSRTY];
}