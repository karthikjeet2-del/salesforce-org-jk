import { LightningElement, api } from 'lwc';
import { openSubtab, closeTab, getFocusedTabInfo } from 'lightning/platformWorkspaceApi';

export default class GetparentTabIdComponent extends LightningElement {
    caseId;

    simulateCaseCreation() {
    // Simulate a case being created
    const newCaseId = '5005g0000038WJ4AAM'; // Replace with real caseId if dynamic
    this.handleCaseCreation(newCaseId);
    }
    // Simulated case creation handler
    async handleCaseCreation(caseIdFromFlow) {
        this.caseId = caseIdFromFlow;

        const parentTabId = sessionStorage.getItem('parentTabId');
        console.log('Retrieved parentTabId from sessionStorage:', parentTabId);

        try {
            await openSubtab({
                parentTabId: parentTabId || undefined,
                pageReference: {
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.caseId,
                        objectApiName: 'Case',
                        actionName: 'view'
                    }
                },
                focus: true
            });

            // Close current LWC tab
            const currentTab = await getFocusedTabInfo();
            await closeTab(currentTab.tabId);

            // Clean up
            sessionStorage.removeItem('parentTabId');

        } catch (error) {
            console.error('Error opening case subtab:', error);
        }
    }
}