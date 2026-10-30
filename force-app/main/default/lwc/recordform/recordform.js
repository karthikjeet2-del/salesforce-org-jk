import { LightningElement,api } from 'lwc';
import NAME from '@salesforce/schema/Contact.LastName';
import DEPARTMENT from '@salesforce/schema/Contact.Department';

export default class Recordform extends LightningElement {

fields =[NAME,DEPARTMENT];    
@api recordId;
 objectApiName ='Contact';



}