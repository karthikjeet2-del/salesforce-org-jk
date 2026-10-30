import { LightningElement, track, api } from "lwc";
import findUserRecords from "@salesforce/apex/TransferMassRecords.findUserRecords";

export default class UserSearchComponent extends LightningElement {


@track recordsList;
@track searchKey = "";
@api selectedValue;
@api selectedRecordId;
 objectApiName='User';
@api fieldApiName;
@api filterCond;
@api filterCity;
@api iconName;
@api lookupLabel;
@track message;
onLeave(event) {
setTimeout(() => {
this.searchKey = "";
this.recordsList = null;
}, 300);
}
onRecordSelection(event) {
this.selectedRecordId = event.target.dataset.key;
this.selectedValue = event.target.dataset.name;
this.searchKey = "";
this.onSeletedRecordUpdate();
}
handleKeyChange(event) {
const searchKey = event.target.value;
this.searchKey = searchKey;
this.getLookupResult();
}
removeRecordOnLookup(event) {
this.searchKey = "";
this.selectedValue = null;
this.selectedRecordId = null;
this.recordsList = null;
this.onSeletedRecordUpdate();
}
getLookupResult() {
findUserRecords({ searchKey: this.searchKey, objectName : this.objectApiName ,fieldAPI : this.fieldApiName, filterCond : this.filterCond, filterCity : this.filterCity})
.then((result) => {
if (result.length===0) {
this.recordsList = [];
this.message = "No Records Found";
} else {
this.recordsList = result;
this.message = "";
}
this.error = undefined;
})
.catch((error) => {
this.error = error;
this.recordsList = undefined;
});
}
onSeletedRecordUpdate(){
const passEventr = new CustomEvent('recordselection', {
detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }
});
this.dispatchEvent(passEventr);
}
}