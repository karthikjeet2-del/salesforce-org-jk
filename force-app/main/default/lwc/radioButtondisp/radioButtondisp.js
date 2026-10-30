import { LightningElement, wire, api, track } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class radioButtondisp extends LightningElement {

    @api objectName = 'Account';
    @api fieldName = 'Industry';
    @track fieldLabel;
    @api recordTypeId;
    @api value;
    @track options;
    apiFieldName;
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
        this.value=event.target.value;
        alert(event.detail.value);
        alert(value);
        this.handleFieldChange(value);
       }
       handleFieldChange(myname){
       alert('myuuu'+myname);
       console.log(myname);
       }  
    @wire(getObjectInfo, { objectApiName: '$objectName' })
    getObjectData({ error, data }) {
        if (data) {
            if (this.recordTypeId == null)
                this.recordTypeId = data.defaultRecordTypeId;
            this.apiFieldName = this.objectName + '.' + this.fieldName;
            this.fieldLabel = data.fields[this.fieldName].label;
            
        } else if (error) {
            // Handle error
            console.log('==============Error  ');
            console.log(error);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$apiFieldName' })
    getPicklistValues({ error, data }) {
        if (data) {
            // Map picklist values
            this.options = data.values.map(plValue => {
                return {
                    label: plValue.label,
                    value: plValue.value
                };
            });

        } else if (error) {
            // Handle error
            console.log('==============Error  ' + error);
            console.log(error);
        }
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}