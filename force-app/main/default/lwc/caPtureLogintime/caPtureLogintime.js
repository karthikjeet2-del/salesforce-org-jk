import { LightningElement,track } from 'lwc';

export default class CaPtureLogintime extends LightningElement {

@track loginTime;
@track logoutTime;
differentiaior=true;

expenseAmount(){ 

     var today = new Date();
     var date =  String(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear());
     var time = String(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
     var dateTime=date+''+time      
     this.loginTime=dateTime
   
   
    
}
login(){
    this.expenseAmount();
}
logout(){
    this.differentiaior=false;
    alert(differentiaior);
    this.expenseAmount();
}
}