import { LightningElement,api,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class CallFlowFromListButton extends NavigationMixin(LightningElement) {
    @api ids;
    flowApiName='MassTransferOpportunity_Records';
    flowInputVariables=this.ids;
    @track isShowModal = false;

    showModalBox() {  
        this.isShowModal = true;
    }
        
    hideModalBox() {  
        this.isShowModal = false;
    }
    
}