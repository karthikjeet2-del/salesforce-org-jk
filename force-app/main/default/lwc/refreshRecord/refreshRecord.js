import { LightningElement,api } from 'lwc';

export default class RefreshRecord extends LightningElement {
    @api recordId;
    connectedCallback(event){
        const objChild = this.template.querySelector('c-display-related-listdata');
        objChild.refreshComponent();
    }
}