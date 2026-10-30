import { LightningElement } from 'lwc';

export default class ParenttoChild extends LightningElement {

    datatoChild = { name :'',value:''};
    sendDatatoChild(event){
        let temp = event.detail.value;
          this.datatoChild = {name:temp, value:'JK'};
    }
    handleClick(){
        const datatochild1 = this.template.querySelector('c-child-component1');
        datatochild1.childmethod('Yayyyyyyyyy');
    }
}


/*


datafroChild;

@api
receivedataFromParent(event){
    this.datafroChild = event.detail.value
}
*/