import { LightningElement, track } from 'lwc';

export default class StringInterpolation extends LightningElement {

@track
firstVar;
@track
secondVar;
showinterpolatedValue;
interpolatedValue;
handleInput1(event){
   this.firstVar = event.target.value;
}
handleInput2(event){
   this.secondVar = event.target.value;
}
handleClick(){
    this.showinterpolatedValue = true;
    this.interpolatedValue = `$ {this.firstVar} $ {this.secondVar}`;
}
}