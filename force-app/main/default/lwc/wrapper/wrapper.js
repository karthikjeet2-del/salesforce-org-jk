import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/wrapperController.getAccountList';
export default class Wrapper extends LightningElement {

    @wire(getAccountList)WrapperData;
}