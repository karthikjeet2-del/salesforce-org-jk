import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_SOURCE from '@salesforce/schema/Account.AccountSource';
import ACCOUNT_Industry from '@salesforce/schema/Account.Industry';
//
import getAccountData from '@salesforce/apex/AccountDataHelper.getAccountData';

export default class getpicklistvalues extends LightningElement {
    @track columns = [{
        label: 'Account name',
        fieldName: 'Name',
        type: 'text',
        sortable: true
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'text',
        sortable: true
    },
    {
        label: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'Currency',
        sortable: true
    }];
    @track pickval1;
    @track pickval2;
    @track AccountData;
    @track error;
    @wire(getPicklistValues,
        {
            recordTypeId: '0125g000000Ze61AAC', //pass id dynamically
            fieldApiName: ACCOUNT_SOURCE
        }
    )
    SourceValues;
    debugger;
    handleSourceValues(event){       
        this.pickval1 = event.target.value;
    } 
    @wire(getPicklistValues,
        {
            recordTypeId: '0125g000000Ze61AAC', //pass id dynamically
            fieldApiName: ''
        }
    )
    ClusterOptions;
    handleIndustryValues(event){       
        this.pickval2 = event.target.value;
    } 
    handleClick(){
        getAccountData({ value1: this.pickval1,value2: this.pickval2})
        .then(result => {
            console.log(JSON.stringify(result));
            this.AccountData = result;

            console.log('hi::'+this.AccountData);
               })
        .catch(error => {
             this.error = error;
                     });
    }
    downloadCSVFile() {   
        let rowEnd = '\n';
        let csvString = '';
        // this set elminates the duplicates if have any duplicate keys
        let rowData = new Set();

        // getting keys from data
        this.AccountData.forEach(function (record) {
            Object.keys(record).forEach(function (key) {
                rowData.add(key);
            });
        });

        // Array.from() method returns an Array object from any object with a length property or an iterable object.
        rowData = Array.from(rowData);
        
        // splitting using ','
        csvString += rowData.join(',');
        csvString += rowEnd;

        // main for loop to get the data based on key value
        for(let i=0; i < this.AccountData.length; i++){
            let colValue = 0;

            // validating keys in data
            for(let key in rowData) {
                if(rowData.hasOwnProperty(key)) {
                    // Key value 
                    // Ex: Id, Name
                    let rowKey = rowData[key];
                    // add , after every value except the first.
                    if(colValue > 0){
                        csvString += ',';
                    }
                    // If the column is undefined, it as blank in the CSV file.
                    let value = this.AccountData[i][rowKey] === undefined ? '' : this.AccountData[i][rowKey];
                    csvString += '"'+ value +'"';
                    colValue++;
                }
            }
            csvString += rowEnd;
        }

        // Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = 'Account Data.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click(); 
    }
}