import { LightningElement, api, track } from 'lwc';

export default class MultidelectChild extends LightningElement {

  /*  @api receivedPickListValues; //Picklist values sent by parent component
    @api selectedValues; //Values that has been selected
    @api fieldApiName; //API Name which makes component to be generic
    @track pickListValues = [];
    @track fieldName;

    selectedPickListValues = [];

    connectedCallback() {
        var i;
        let pickListValues = [];
        if (this.receivedPickListValues !== undefined) {
            this.receivedPickListValues.forEach(eachPicklistValue => {
                if(eachPicklistValue.hasOwnProperty('value')){
                    pickListValues.push(eachPicklistValue.value);
                    this.pickListValues = [...pickListValues];
                }
            });
        }
    }

    renderedCallback() {
        var i;
        if (this.receivedPickListValues !== null && this.receivedPickListValues !== undefined) {
            for (i = 0; i < this.receivedPickListValues.length; i++) {
                if(this.selectedValues !== undefined && this.selectedValues.includes(this.receivedPickListValues[i].value)) {
                    if (this.template.querySelectorAll('.highlightRow')[i].style !== undefined) {
                        this.template.querySelectorAll('.highlightRow')[i].style = 'background-color: rgba(9, 106, 189, 0.85); color : white;cursor: pointer;';
                        this.selectedPickListValues.push(this.receivedPickListValues[i].value);
                    }
                } else {
                    if (this.template.querySelectorAll('.highlightRow')[i].style !== undefined) {
                        this.template.querySelectorAll('.highlightRow')[i].style = 'background-color: white; cursor: pointer;';
                        this.template.querySelectorAll('.addOrRemoveCheck')[i].style = 'opacity :0;';
                    }
                }
            }
        }
    }

    handleSelection(event) {
        var item = event.currentTarget;
        var valueChoosen;
        var options;
        var i, j, k;
        let pickListValues = [];
        let selectedPickListValues1 = [];
        let found = false;
        if (item && item.dataset) {
            valueChoosen = item.dataset.value;
            pickListValues = this.selectedPickListValues;
            options = pickListValues;

            for (i = 0; i < options.length; i++) {
                if (options[i] === valueChoosen) {
                    found = true;
                    for (k = 0; k < this.receivedPickListValues.length; k++) {
                        if (this.receivedPickListValues[k].hasOwnProperty('value')) {
                            if (this.receivedPickListValues[k].value.indexOf(valueChoosen) > -1) {
                                this.template.querySelectorAll('.highlightRow')[k].style = 'background-color: white; cursor: pointer;';
                                this.template.querySelectorAll('.addOrRemoveCheck')[k].style = 'opacity :0;';
                            }
                        }
                    }
                    delete pickListValues[i];
                }
            }

            if (!found) {
                pickListValues.push(valueChoosen);
                for (i = 0; i < this.receivedPickListValues.length; i++) {
                    if (this.receivedPickListValues[i].hasOwnProperty('value')) {
                        if (this.receivedPickListValues[i].value.indexOf(valueChoosen) > -1) {
                            this.template.querySelectorAll('.highlightRow')[i].style = 'background-color: rgba(9, 106, 189, 0.85); color : white; cursor: pointer;';
                            this.template.querySelectorAll('.addOrRemoveCheck')[i].style = 'opacity :1;';
                        }
                    }
                }
            }
        }
        this.selectedPickListValues = pickListValues;
        
        const picklistEvent = new CustomEvent("multipicklistgenericevent", {
            detail: {fieldName: this.fieldApiName, value : this.selectedPickListValues}

        });

        this.dispatchEvent(picklistEvent);
    }*/





    ///////////////////////////////////////////////////////////////////c/displayContactFieldsonPayment
    @api label = "Default label";
    _disabled = false;
    @api
    get disabled(){
        return this._disabled;
    }
    set disabled(value){
        this._disabled = value;
        this.handleDisabled();
    }
    @track inputOptions;
    @api
    get options() {
        return this.inputOptions.filter(option => option.value !== 'All');
    }
    set options(value) {
        let options = [{
            value: 'All',
            label: 'All'
        }];
        this.inputOptions = options.concat(value);
    }
    @api
    clear(){
        this.handleAllOption();
    }
    value = [];
    @track inputValue = 'All';
    hasRendered;
    renderedCallback() {
        if (!this.hasRendered) {
            //  we coll the logic once, when page rendered first time
            this.handleDisabled();
        }
        this.hasRendered = true;
    }
    handleDisabled(){
        let input = this.template.querySelector("input");
        if (input){
            input.disabled = this.disabled;
        }
    }
    comboboxIsRendered;
    handleClick() {
        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.toggle("slds-is-open");
        if (!this.comboboxIsRendered){
            let allOption = this.template.querySelector('[data-id="All"]');
            allOption.firstChild.classList.add("slds-is-selected");
            this.comboboxIsRendered = true;
        }
    }
    handleSelection(event) {
        let value = event.currentTarget.dataset.value;
        if (value === 'All') {
            this.handleAllOption();
        }
        else {
            this.handleOption(event, value);
        }
        let input = this.template.querySelector("input");
        input.focus();
        this.sendValues();
    }
    sendValues(){
        let values = [];
        for (const valueObject of this.value) {
            values.push(valueObject.value);
        }
        this.dispatchEvent(new CustomEvent("valuechange", {
            detail: values
        }));
    }
    handleAllOption(){
        this.value = [];
        this.inputValue = 'All';
        let listBoxOptions = this.template.querySelectorAll('.slds-is-selected');
        for (let option of listBoxOptions) {
            option.classList.remove("slds-is-selected");
        }
        let allOption = this.template.querySelector('[data-id="All"]');
        allOption.firstChild.classList.add("slds-is-selected");
        this.closeDropbox();
    }
    handleOption(event, value){
        let listBoxOption = event.currentTarget.firstChild;
        if (listBoxOption.classList.contains("slds-is-selected")) {
            this.value = this.value.filter(option => option.value !== value);
        }
        else {
            let allOption = this.template.querySelector('[data-id="All"]');
            allOption.firstChild.classList.remove("slds-is-selected");
            let option = this.options.find(option => option.value === value);
            this.value.push(option);
        }
        if (this.value.length > 1) {
            this.inputValue = this.value.length + ' options selected';
        }
        else if (this.value.length === 1) {
            this.inputValue = this.value[0].label;
        }
        else {
            this.inputValue = 'All';
        }
        listBoxOption.classList.toggle("slds-is-selected");
    }
    dropDownInFocus = false;
    handleBlur() {
        if (!this.dropDownInFocus) {
            this.closeDropbox();
        }
    }
    handleMouseleave() {
        this.dropDownInFocus = false;
    }
    handleMouseEnter() {
        this.dropDownInFocus = true;
    }
    closeDropbox() {
        let sldsCombobox = this.template.querySelector(".slds-combobox");
        sldsCombobox.classList.remove("slds-is-open");
    }


}