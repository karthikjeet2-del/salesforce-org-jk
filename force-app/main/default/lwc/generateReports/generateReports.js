import { api, LightningElement } from 'lwc';
import { getPicklistValues, getPicklistValuesByRecordType, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_SOURCE from '@salesforce/schema/Account.AccountSource';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GenerateReports extends LightningElement {
filter1;
filter2;
@api
 get filter1(){
     return this.filter1;
 }
 set filter1(value){
    this.filter1=value;
}
@api
 get filter2(){
     return this.filter1;
 }
 set filter2(value){
    this.filter2=value;
}
}