import { LightningElement,wire } from 'lwc';
import getAccountData from '@salesforce/apex/AccountController.getAccountdata';
export default class RefreshApex extends LightningElement {

    COL = [
        {label:'Name',fieldname:'name', type:'Text'},
        {label:'phone',fieldname:'Phone',type:'phone'}
    ];
    tableData;
    @wire(getAccountData)
    wireddata(data,error){
        console.log('data>>>>>>>>>>>>>>'+data);
    if(data){
      this.tableData = data;
    }
    else if(error){
      console.log('error>>>>>>>>>>>>>>'+error);
    }
    }
    getSelectedrow(event){

    }
}