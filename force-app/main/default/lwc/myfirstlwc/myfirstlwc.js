import { LightningElement,api } from 'lwc';

export default class Myfirstlwc extends LightningElement {
 @api
 childFunction(){
    console.log('I am From child');
 }
}