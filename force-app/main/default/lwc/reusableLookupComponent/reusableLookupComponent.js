import { LightningElement,api } from 'lwc';
import searchMethod from '@salesforce/apex/RecordSerachHandler.searchMethod';
export default class ReusableLookupComponent extends LightningElement {

    @api label;
    @api objectName;
    serachTerm;
    searchOptions = [];
    error;
    handleChange(event){
        console.log('event.target.value>>'+event.target.value);
        searchMethod({searchTerm : event.target.value , objectName : this.objectName})
        .then(result=>{
            console.log('result>>'+JSON.stringify(result));
            for(let data of result){
            this.searchOptions.push({label : data.Name, value : data.Id});
            }
            console.log('searchOptions>>'+JSON.stringify(this.searchOptions));
        })
        .catch(error=>{
           this.error  = error;
        })
        
    }

}