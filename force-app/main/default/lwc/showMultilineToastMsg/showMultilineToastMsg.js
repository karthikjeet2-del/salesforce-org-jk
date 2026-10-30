import { LightningElement } from 'lwc';

export default class ShowMultilineToastMsg extends LightningElement {
    name;
    toastMessage = {msg:'',type:'',mode:''};
    displyChildCmp = false;
    handleName(event){
      console.log('event.detail>>'+event.detail.value);
      this.name = event.detail.value;
      
    }
    handleClick(){
        if(this.name == 'Karthik'){
            this.toastMessage.msg = 'Congrats KARTHIK J! You have shown the decipline in your work and you will be rewarded for your work! Stay Focused,Stay Confident!';
            this.toastMessage.type = 'Success' ;
            this.toastMessage.mode = 'Dimissable';
            this.displyChildCmp = true;
        }
          else{
            this.toastMessage.msg = 'Please Enter Your Correct Name!';
            this.toastMessage.type = 'Error' ;
            this.toastMessage.mode = 'Dimissable';
            this.displyChildCmp = true;
          }
         
          console.log(' this.toastMessage>>'+JSON.stringify(this.toastMessage))
    }
}