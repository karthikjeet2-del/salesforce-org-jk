import { LightningElement,api,track } from 'lwc';
import acoountsdetails from '@salesforce/apex/AccountHelper.acoountsdetails';
 export default class currentRecordID extends LightningElement {
   @track columns = [{
      label: 'Account name',
      fieldName: 'Name',
      type: 'text',
      sortable: true
  },
  {
      label: 'Type',
      fieldName: 'Type',
      type: 'text',
      sortable: true
  },
  {
      label: 'Annual Revenue',
      fieldName: 'AnnualRevenue',
      type: 'Currency',
      sortable: true
  },
  {
      label: 'Phone',
      fieldName: 'Phone',
      type: 'phone',
      sortable: true
  },
  {
      label: 'Website',
      fieldName: 'Website',
      type: 'url',
      sortable: true
  },
  {
      label: 'Rating',
      fieldName: 'Rating',
      type: 'test',
      sortable: true
  }
];
    @api recordId;
    acclist;
    connectedCallback(){
       console.log('gegge');
      acoountsdetails({})
      .then(result=>{
         console.log('>>>.++result+'+result);
        this.acclist = result;
        console.log('>>>.+++'+this.acclist);
      })
      .catch(error=>{
         onsole.log('>>>.error'+error);
      })
    }
 }