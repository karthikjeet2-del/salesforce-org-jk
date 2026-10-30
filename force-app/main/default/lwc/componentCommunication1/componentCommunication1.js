import { LightningElement } from 'lwc';

export default class ComponentCommunication1 extends LightningElement {

    options=[
        {label:"Bengaluru",value:"Bengaluru"},
        {label:"Mysuru",value:"Mysuru"},
        {label:"Shivamogga",value:"Shivamogga"},
        {label:"Davanagere",value:"Davanagere"},
        {label:"Hubballi",value:"Hubballi"},
        {label:"Mangaluru",value:"Davanagere"},
        {label:"Belagavi",value:"Belagavi"}
    ]

handleValueSelection(event){
console.log('event>>'+event.detail.value);
}
}