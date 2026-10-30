import { LightningElement ,api,wire} from 'lwc';
import getAccountData from '@salesforce/apex/AccountController.getAccountdata';
const columns = [
    {label:'Name',fieldname:'Name'},
    {label:'Phone',fieldname:'Phone'},
    {label:'Email',fieldname:'Email'}
];
export default class LearnDebugging extends LightningElement {
    recordData=[];
    columns = columns;
    // @wire(getAccountData)
    // wiredRecordData({error,result}){
    //     if(result){
    //       this.recordData = result;
    //     }
    //     else if(error){
    //       console.log('errorr>>>>>'+error);
    //     }
    // }
    connectedCallback(){
        console.log('result>>>>>');
    getAccountData({})
    .then(result=>{
        this.recordData = result;
        console.log('result>>>>>'+result);
    })
    .catch(error=>{
        console.log('errorr>>>>>'+error);
    })
    }

       
}