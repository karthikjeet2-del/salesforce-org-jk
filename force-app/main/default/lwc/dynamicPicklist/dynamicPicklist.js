import { LightningElement } from 'lwc';

export default class DynamicPicklist extends LightningElement {

    picklist1Options=[
        {label:'A',value:'A'},
        {label:'B',value:'B'},
        {label:'C',value:'C'},
        {label:'D',value:'D'}];
    picklist2Options =[];
    picklist3Options =[];
    selected1Option;
    handlePicklist1Change(event){
       this.selected1Option = event.detail.value;
       this.picklist2Options =[];
       console.log('event>>>'+event.detail.value);
       for(let data of this.picklist1Options){
          if(data.value != event.detail.value){
            this.picklist2Options.push(data); 
          }
       }
      console.log('>>>>>>>>>>>>>>'+JSON.stringify(this.picklist2Options)); 
    }
    handlePicklist2Change(event){
        this.picklist3Options =[];
        for(let data of this.picklist2Options){
            if(data.value != event.detail.value){
              this.picklist3Options.push(data); 
            }
         } 
         console.log('>>>>>>>>>>>>>>'+JSON.stringify(this.picklist3Options)); 
    }
    handlePicklist3Change(event){
        
    }

}