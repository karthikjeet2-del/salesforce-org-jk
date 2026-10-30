import { LightningElement,api } from 'lwc';
import transferRecords from '@salesforce/apex/TransferMassRecords.massTransferRecords'

export default class MAssTransferRecords extends LightningElement {
    @api listViewIds;
    @api newUserId;
    //records = this.listViewIds;
    //recordSize = size(this.records);
	tranferRecordstoNewOwner(){
        console.log('listViewIds>>>'+this.listViewIds)
        console.log('newUserId>>>'+this.newUserId)
        transferRecords({recordIds : this.listViewIds,newUserId : this.newUserId})
        .then(result=>{
           if(result !== null && result=='SUCCESS'){
            console.log('>>>>>>>>>>>>>>>>>>>.'+result)
            setTimeout(
                function() {
                    window.history.back();
                },
                1000
            );
           }
        })
        .catch(error=>{
            console.log('e>>>'+error);
        })
		
	}
}