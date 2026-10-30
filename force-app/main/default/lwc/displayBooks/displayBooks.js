import { LightningElement } from 'lwc';
import topSellingFiveBooks from '@salesforce/apex/bookHandler.topSellingFiveBooks';

export default class DisplayBooks extends LightningElement {

    top5Books = [];
error;
connectedCallback(){
    topSellingFiveBooks({})
    .then(result=>{
        console.log('result>>>'+JSON.stringify(result));
     this.top5Books = result;
    })
    .catch(error=>{
      this.error = error;
    });
}
}