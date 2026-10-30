import { LightningElement,api,track } from 'lwc';
//import cx_Avatar from  '@salesforce/resourceUrl/cxrating';
export default class customerRatingComponent extends LightningElement {
 //   CX_Image=cx_Avatar;
    @api propertyValue;
 
    customerRating;
    rating(event) {
      this.customerRating = event.target.value;
      console.log('this.customerRating>>'+this.customerRating)
       
    }
   /* rating(event){
        this.customerRating = event.target.value;
        console.log('this.customerRating>>'+this.customerRating)
        var compDefinition = {
            componentDef: "c:StarRatingComponent",
            attributes: {
                propertyValue: this.customerRating
            }
        };
        console.log('compDefinition>'+JSON.stringify(compDefinition))
        // Base64 encode the compDefinition JS object
        var encodedCompDef = btoa(JSON.stringify(compDefinition));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedCompDef
            }
        });
    }*/
}