import { LightningElement, track} from 'lwc';
import getPickListValuesIntoList from '@salesforce/apex/AccountDataHelper.getPickListValuesIntoList';
export default class GetpicklistValuesbasedonField extends LightningElement {
    @track error;
    @track fieldVal;
    @track FieldAPIName;
    ObjectName='Case';
    @track picklistDataFromApex;
    @track picklistvalues=[];
    FieldMap =new Map();
    @track mapData= [];
    @track fieldOptions1=[];
    @track Valueoptions=[];
    get OperatorOptions() {
        return [
            { label: 'Origin', value: 'Origin' },
            { label: 'Product', value: 'Product__c' },
            { label: 'Reason', value: 'Reason' }
          ];
    }
    
    handleFieldChange(event){
        this.fieldVal=event.detail.value;
        this.handleValueForField(event.detail.value);
     }
     handlevalueChange(event){
    this.value=event.detail.value;
     }
    handleValueForField(FieldName){
       console.log(FieldName);
         getPickListValuesIntoList({objectType:this.ObjectName,selectedField:FieldName })
        .then(result => {
            console.log('Result123'+JSON.stringify(result));
            /*var conts =result;
            conts.forEach((item, index)=>{
                this.mapData.push({label:item.MasterLabel, value:item.DeveloperName})
                this.FieldMap.set(item.DeveloperName,item)
            })
            this.fieldOptions1=JSON.parse(JSON.stringify(this.mapData));
            console.log('11'+this.FieldMap);
            console.log('22'+JSON.stringify(this.FieldMap));
            console.log('33'+JSON.parse(JSON.stringify(this.FieldMap))); */
           })
        .catch(result=>{
            console.log(error);
        })
    }
}