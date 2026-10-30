import { LightningElement,track,api } from 'lwc';
import NAME from '@salesforce/schema/Opportunity.Name';
import STAGE from '@salesforce/schema/Opportunity.StageName';
import AMOUNT from '@salesforce/schema/Opportunity.Amount';
//import COUNTRY from '@salesforce/schema/Opportunity.contactroles.country';


export default class ShowOppFields extends LightningElement {
    @api objectApiName;
    @api recordId;
    @track fields ={ name : NAME,stage : STAGE,ammount :AMOUNT};

}