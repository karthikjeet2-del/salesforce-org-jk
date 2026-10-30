import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class MultiselectParent extends LightningElement {
      /*  fieldValue = '';
    
        get pickListValues(){
            return[
                {label: 'Web', value: 'Web'},
                {label: 'Phone Inquiry', value: 'Phone Inquiry'},
                {label: 'Partner Referral', value: 'Partner Referral'},
                {label: 'Purchased List', value: 'Purchased List'},
                {label: 'Other', value: 'Other'},
                
            ]
        }
    
        multipicklistgenericevent(event){
            this.fieldValue = event.detail.value;
            console.log('this.fieldValue>>>'+this.fieldValue);
        }*/


        /////////////////////////////////////////////////////


    picklistValues;
    error;
    @wire(getPicklistValues, { 
        recordTypeId: '012000000000000AAA', fieldApiName: INDUSTRY_FIELD 
    })
    wiredPicklist({ error, data }){
        
        if(data){
            this.picklistValues = data.values;
            console.log(' data ', data.values);
            this.error = undefined;
        }
        if(error){
            this.picklistValues = undefined;
            this.error = error;
        }
    }

    handleValueChange(event){
        let arr=[];
        console.log(JSON.stringify(event.detail));
        arr=event.detail;
        console.log('arr>>>'+arr.toString())
    }

    }