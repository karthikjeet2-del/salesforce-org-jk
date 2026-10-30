import { LightningElement,api,wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import getAccountId from '@salesforce/apex/AccountController.getAccountId';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class Navigation extends NavigationMixin(LightningElement) {
@api recordId;
@wire(getAccountId,{recordId : '$recordId'})
wiredAccount;
handleClick(event){
    const event1 = new ShowToastEvent({
             title:'SUCCESS',
             message:'Hey You are awesome! You know that right!!!!!',
             variant :'success',
             mode:'dismissable'
             
    });
   
    this.dispatchEvent(event1);
    console.log('this.wiredAccount.Id>>>'+JSON.stringify(this.wiredAccount));
        this[NavigationMixin.Navigate]({
        /*type:'standard__recordPage',
        attributes:{
        recordId : this.wiredAccount.data.AccountId,
        objectApiName : 'Account',
            actionName : 'view'
        }
        type:'standard__namedPage',
        attributes:{
           pageName :'home'
        }
        type:'standard__webPage',
        attributes:{
           url :'www.google.com'
        }
        type:'standard__objectPage',
        attributes:{
        objectApiName : 'Account',
            actionName : 'list'
        },
        state:{
            filterName : 'All'
        }*/
        type:'standard__recordRelationshipPage',
        attributes:{
            recordId : this.recordId,    
            objectApiName : 'Account',
            relationshipApiName : 'Contacts',
            actionName: 'view'
        }

});
}
}