import { LightningElement,wire } from 'lwc';
import getCustomMetadataRecords from '@salesforce/apex/CustommetadataRecoords.getCustomMetadataRecords';
export default class DynamicGraphDisplay extends LightningElement {

closePlanArr = [{sectionOptions : [], sectionQuestions : []}];
connectedCallback() {
    getCustomMetadataRecords({})
        .then(result=>{
            console.log('result>>'+JSON.stringify(result))
            for(let closePlan of result){
                console.log('closePlan>'+JSON.stringify(closePlan));
                let questionArr =[];
                for(let closePlanQuestionarrie of closePlan.Close_Plan_Questionarrie__r){
                    console.log('closePlanQuestionarrie>'+JSON.stringify(closePlanQuestionarrie))
                    questionArr.push({question:closePlanQuestionarrie.Question__c,scorePercent:closePlanQuestionarrie.Score_Percent__c});
                }

                this.closePlanArr.push({sectionOptions: [{label:closePlan.Label,value:closePlan.Label}],
                                        sectionQuestions: questionArr});
                
            }
            console.log('>>>>>>>>>>>>>>>>>'+JSON.stringify(this.closePlanArr));
        })
        .catch(error=>{

        })
          
        
    
}
}