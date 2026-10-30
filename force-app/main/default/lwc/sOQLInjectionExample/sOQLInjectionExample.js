import { LightningElement } from 'lwc';
import sOQLInjectedQueryResult from '@salesforce/apex/SOOLQueryResultClass.sOQLInjectedQueryResult';
import sOQLInjectionSanitisedQueryResult from '@salesforce/apex/SOOLQueryResultClass.sOQLInjectionSanitisedQueryResult';
export default class SOQLInjectionExample extends LightningElement {
    notSanitised=true;  
    sanitised=true;
    notSanitisedRecords;
    sanitisedRecords;

    getNotSanitisedRecords(event){
        sOQLInjectedQueryResult({input : event.detail.value})
        .then(result=>{
            if(result != null){
              this.notSanitisedRecords = result;
            }
            else{
               
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    getSanitisedRecords(event){
        sOQLInjectionSanitisedQueryResult({input : event.detail.value})
        .then(result=>{
            if(result != null){
                this.sanitisedRecords = result;
            }
            else{

            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

}