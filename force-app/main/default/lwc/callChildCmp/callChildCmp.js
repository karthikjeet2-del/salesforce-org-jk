import { LightningElement,api  } from 'lwc';

export default class CallChildCmp extends LightningElement {

@api toastmsg //={msg:'',type:'',mode:''};
multilineData = [];
connectedCallback(){
    console.log('This.toastmsg>>>'+JSON.stringify(this.toastmsg));
    this.multilineData = this.toastmsg.msg.split('!');
    console.log('This.multilineData>>>'+JSON.stringify(this.multilineData));
}
get mainDivClass() { 
    return 'slds-notify slds-notify_toast slds-theme_'+this.toastmsg.mode;
  }
get messageDivClass() { 
    return 'slds-icon_container slds-icon-utility-'+this.toastmsg.mode+' slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top';
}
get iconName() {
    return 'utility:'+this.toastmsg.mode;
}
closeModel() {
    const toastModel = this.template.querySelector('[data-id="toastModel"]');
    toastModel.className = 'slds-hide';
}
}