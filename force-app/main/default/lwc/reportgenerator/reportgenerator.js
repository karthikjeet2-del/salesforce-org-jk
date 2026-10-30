import { LightningElement,track,wire,api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Industry from '@salesforce/schema/Account.Industry';
export default class reportgenerator extends LightningElement {
   
    @api objectName = 'Account';
    @api fieldName = '';
    @track AccountData;
    @track error;
    @track displayData;
    FinalValue
    handleSourceValues(event){ 
        alert(event.target.value);
        this.value = event.target.value;
        alert(value);
            handlePicklistValues(event.target.value);
        
    }
    handlePicklistValues(fieldLabel){
       if(fieldLabel=='Industry'){
        this.fieldName= fieldLabel; 
        this.FinalValue=this.objectName+"."+this.fieldName;
        alert(FinalValue);
       }
    } 
    @wire(getPicklistValues,
        {
            recordTypeId: '0125g000000ZJNxAAO', 
            fieldApiName: '$FinalValue'
        }
    )
    IndustyValues;
   /* handleIndustryValues(event){       
        this.FinalValue = event.target.value;
    } 
    
    handleClick(){
        getFilteredData({ value1: this.FieldVal,value2:this.OperatorVal,value3: this.FinalValue})
        .then(result => {
            this.AccountData = result;
            this.displayData=true;
            console.log('hi::'+result);
               })
        .catch(error => {
             this.error = error;
                     });
    }*/
}