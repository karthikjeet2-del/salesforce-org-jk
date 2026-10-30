import { LightningElement, wire, track} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Industry1 from '@salesforce/schema/Account.Industry';

export default class recordview extends LightningElement {
FieldAPIName1='';
fieldValue='';
@track operatorVal;
@track ValueVal;
@track ConditionVal;
get FieldOptions() {
        return [
            { label: 'Industry', value: 'Industry' },
            { label: 'DPD Bucket', value: 'DPD Bucket' },
            { label: 'First EMI BKT', value: 'First EMI BKT' }, {label: 'First EMI Date', value: 'First EMI Date' },
            { label: 'Last month manual pay', value: 'Last month manual pay' },
            { label: 'Payment MP', value: 'Payment MP' },
            { label: 'Priority-Collection Efficiency', value: 'Priority-Collection Efficiency' }
        ];
    }
   
    handleFieldChange(event){
        this.fieldValue=event.detail.value;
        this.FieldAPIName1=this.fieldValue;
       handlefieldapi(FieldAPIName1); 
     }
     handlefieldapi(FieldAPI){
        console.log('>>>>k'+FieldAPI);
        //alert('yyyyy'+FieldAPI);
    }
 }