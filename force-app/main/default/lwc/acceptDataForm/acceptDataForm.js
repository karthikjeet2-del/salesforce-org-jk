import { LightningElement ,wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import bookObject from '@salesforce/schema/Book__c';
import bookGenre_FIELD from'@salesforce/schema/Book__c.Book_Genre__c';
export default class AcceptDataForm extends LightningElement {
    fields={Name:'',Author__c:'',Book_genre__c:''};
    @wire(getObjectInfo, { objectApiName: bookObject })
    bookMetadata;
    @wire(getPicklistValues,{
           recordTypeId: '0125g000000agLP', 
           fieldApiName: bookGenre_FIELD
    })
    bookGenrePicklist;
    handleName(event){
        this.fields.Name=event.detail.value;
    }
    handleAuthorName(event){
        this.fields.Author__c=event.detail.value;
    }
    handleBookGenre(event){
        this.fields.Book_genre__c=event.detail.value;
    }
    createBooks(){
        var fieldsData = this.fields;
        console.log('test-->'+JSON.stringify(fieldsData));
        var recordInput = {'apiName': 'Book__c',fieldsData};
        createRecord(recordInput).then(response=>{
         console.log('test-->'+response.Id);
        })
        .catch(error=>{
            console.log('error->'+JSON.stringify(error));
        })

        }
}