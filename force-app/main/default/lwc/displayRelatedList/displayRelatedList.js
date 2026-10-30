import { LightningElement,wire } from 'lwc';
import {getRelatedListInfo} from 'lightning/uiRelatedListApi';
export default class DisplayRelatedList extends LightningElement {

@wire(getRelatedListInfo, {parentObjectApiName : 'Account', relatedListId : 'contacts'})
wiredFunction({error,data}){
 if(data){
    console.log('data>>>>>>>>>>.'+JSON.stringify(data));
 }
 if(error){
    console.log('error>>>>>>>>>>.'+JSON.stringify(error));
 }
 }
}