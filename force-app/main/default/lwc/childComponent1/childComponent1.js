import { LightningElement,api } from 'lwc';

export default class ChildComponent1 extends LightningElement {

    dataFromParent;
    datafromparenttoFunction ;
    name;
    @api
    receivedatafromParent;// = { name :'',value:''};
    
    @api
    childmethod(data){
        this.receivedatafromParent.name ='Trying to change';
        console.log('hererer'+data);
        this.datafromparenttoFunction = data;
    }
}