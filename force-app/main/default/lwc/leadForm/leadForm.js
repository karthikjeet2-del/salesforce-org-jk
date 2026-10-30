import { LightningElement,api } from 'lwc';
import LASTNAME from '@salesforce/schema/Lead.Name';
import COMPANY from '@salesforce/schema/Lead.Company';
import INDUSTRY from '@salesforce/schema/Lead.Industry';
import STATUS from '@salesforce/schema/Lead.Status';
import PHONE from '@salesforce/schema/Lead.Phone';

export default class LeadForm extends LightningElement {

    fields =[LASTNAME,COMPANY,INDUSTRY,STATUS,PHONE];
    objectName ='Lead';
    // @api
    // recordId;

    // createForm = true; 
    // editForm;
    // Connetedcallback(){
    //     console.log('>>>>>>>>>'+this.recordId);
    //     if(this.recordId == null){
    //        this.createForm = true;
    //        this.editForm = false;
    //     }else{
    //         this.editForm = true;
    //         this.createForm = false;
    //     }
    // }
}