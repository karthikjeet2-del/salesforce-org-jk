({
    parentPress : function(cmp, event, helper) {
        var objChild = cmp.find('compB');
        alert("Method Called from Child " + objChild.get('v.myString'));
    }
})