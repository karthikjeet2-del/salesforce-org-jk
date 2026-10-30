import { LightningElement } from 'lwc';

export default class EventBubble extends LightningElement {

    handleChange(event){
        console.log('<<<<<<<<<<<<<<<detail>>>>>>>>>>>>>'+JSON.stringify(event.detail));
        console.log('<<<<<<<<<<<<<<<target>>>>>>>>>>>>>'+JSON.stringify(event.target));
    }
}