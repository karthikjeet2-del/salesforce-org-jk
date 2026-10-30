import {LightningElement} from 'lwc';

export default class LifeCycleHooks extends LightningElement{

    dataVar;
    connectedCallback(){
        console.log('I am Inside connectedCallback===>'+this.template.querySelector('h1'));
        console.log('I am Inside connectedCallback===>'+this.template.querySelector('p'));
        //const child = this.template.querySelector('c-myfirstlwc');
       // child.childFunction();
    }
    disconnectedCallback(){
        console.log('I am Inside disconnectedCallback===>');
    }
    renderedCalback(){
        console.log('I am Inside renderedCalback===>');
    }
    errorCallback(){
        console.log('I am Inside errorCallback===>');
    }
}