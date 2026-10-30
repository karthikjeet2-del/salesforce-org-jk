import { LightningElement, track,api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNTNUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
export default class addrowDynamically extends LightningElement {
    @track accountList = []; 
    @track index = 0;
    @api recordId;
    @track name = NAME_FIELD;
    @track accNumber = ACCOUNTNUMBER_FIELD;
    @track phone = PHONE_FIELD;
    isLoaded = false;

    @api record = {
        firstName : '',
        lastName : '',
        Email : '',
        Phone : '',
        Title : ''
    }

    acc = {
        Name : this.name,
        AccountNumber : this.accNumber,
        Phone : this.phone ? this.phone : "",
        key : ''
    }

    addRow(){
       alert('hgyurei'+this.accNumber);
        this.index++;
        //var i = JSON.parse(JSON.stringify(this.index));
        var i = this.index;
   
        /*this.accountList.push ({
            sobjectType: 'Account',
            Name: '',
            AccountNumber : '',
            Phone: '',
            key : i
        });*/
        this.acc.key = i;
        this.accountList.push(JSON.parse(JSON.stringify(this.acc)));

        console.log('Enter ',this.accountList);
        
       // this.accountList.push(this.record);
        //console.log(' After adding Record List ', this.accountList);
    }
    
    removeRow(event){
        this.isLoaded = true;
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        if(this.accountList.length>1){
            this.accountList.splice(key, 1);
            this.index--;
            this.isLoaded = false;
        }else if(this.accountList.length == 1){
            this.accountList = [];
            this.index = 0;
            this.isLoaded = false;
        }

        //this.dispatchEvent(new CustomEvent('deleterow', {detail: this.index}));
        //console.log(' After adding Record List ', this.dispatchEvent);
    } 

    

    handleNameChange(event) {
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        var accountVar = this.accountList[key];
        this.accountList[key].Name = event.target.value;
        //this.acc.Name = event.target.value;
        //console.log("name", this.acc.Name);
    }
    
    handleAccountNumberChange(event) {
        /*this.acc.AccountNumber = event.target.value;
        console.log("AccountNumber", this.acc.AccountNumber);*/
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        var accountVar = this.accountList[key];
        this.accountList[key].AccountNumber = event.target.value;
    }
    
    handlePhoneChange(event) {
        /*this.acc.Phone = event.target.value;
        console.log("Phone", this.acc.Phone);*/
        var selectedRow = event.currentTarget;
        var key = selectedRow.dataset.id;
        var accountVar = this.accountList[key];
        this.accountList[key].Phone = event.target.value;
    }
    
    
      
}