import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import ACCOUNT_NAME from "@salesforce/schema/Contact.Account.Name";
import GRAND_PARENT_ACCOUNT from "@salesforce/schema/Contact.Account.Parent.Name";
import CONTACT_NAME from "@salesforce/schema/Contact.Name";

export default class GetParentOnChild extends LightningElement {
	@api recordId;

	@wire(getRecord, {
		recordId: "$recordId",
		fields: [CONTACT_NAME, ACCOUNT_NAME, GRAND_PARENT_ACCOUNT]
	})
	contactData;
	debugger;

	get contactName() {
		return getFieldValue(this.contactData.data, CONTACT_NAME);
	}

	get parentAccountName() {
		return getFieldValue(this.contactData.data, ACCOUNT_NAME);
	}

	get grandParentAccountName() {
		return getFieldValue(this.contactData.data, GRAND_PARENT_ACCOUNT);
	}
}