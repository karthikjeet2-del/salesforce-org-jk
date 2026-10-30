import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavigateBro extends NavigationMixin(LightningElement) {


    handleClick(){
        console.log('Here');
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes: {
                recordId :'0015g00001Dbwr5AAB',
                ObjectName :'Account',
                actionName: 'view'
            }
        });
    }
}