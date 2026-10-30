import { LightningElement } from 'lwc';

export default class CheckBoxes extends LightningElement {
value = ['Checkbox1'];
dataArr=[];
get options(){
    return [
    {label:'Checkbox1',value:'Checkbox1'},
    {label:'Checkbox2',value:'Checkbox2'},
    {label:'Checkbox3',value:'Checkbox3'}
    ];
}

handleCheckBocClick(event){
    console.log('>>>>>'+JSON.stringify(event.detail));
    console.log('>>>>>'+event.detail.checked);
    this.dataArr = this.template.querySelectorAll('lightning-input[data-name="checkbox"]:checked');
    console.log('>>>>>'+JSON.stringify(this.dataArr));
    /*for(let data of this.dataArr){
        if(data.value)
    }*/
}
}