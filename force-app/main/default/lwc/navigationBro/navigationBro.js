import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigationBro extends NavigationMixin(LightningElement) {



    handleClick(){
        console.log('dbvadgbskdbcdksckjskmbasalamac,ma,ackwjndewkdnnnn');
        this[NavigationMixin.Navigate]({
            /*type : "standard__objectPage",
            attributes :{
                objectApiName : "Account",
                actionName: "list"
            },
            state :{
               filterName :"MyAccounts" // Recent,Jks,00B5g000007XiIJEA0 ---- DeveloperName    also Id works
                                         //SELECT  Id,NAME,developername FROM ListView WHERE SobjectType ='Account'
            }
        });*/
        type: "standard__navItemPage",
        attributes :{
            apiName : "AccountContact"
        }
     });
    }

}