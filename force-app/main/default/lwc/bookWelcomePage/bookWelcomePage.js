import { LightningElement } from 'lwc';

export default class BookWelcomePage extends LightningElement {

    searchBook(event){
       console.log('event>'+event.target.value);
    }
}