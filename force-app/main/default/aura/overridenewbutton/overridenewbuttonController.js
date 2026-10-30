({
    handleNewCase: function(component, event, helper) {
        const workspaceAPI = component.find("workspace");

        workspaceAPI.getFocusedTabInfo().then(function(response) {
            const parentTabId = response.tabId;

            // ✅ Store the list view tabId
            sessionStorage.setItem('parentTabId', parentTabId);
            console.log('Stored parentTabId:', parentTabId);

            // ✅ Open your custom LWC in a new tab
            workspaceAPI.openTab({
                pageReference: {
                    type: 'standard__component',
                    attributes: {
                        componentName: 'c__CallLwc' // your LWC
                    },
                    state: {
                        // you can pass state params if needed
                    }
                },
                focus: true
            }).then(function(tabId) {
                console.log('Opened new tab with LWC:', tabId);
            }).catch(function(error) {
                console.error('Error opening new tab:', error);
            });

        }).catch(function(error) {
            console.error('Error getting focused tab info:', error);
        });
    }
});