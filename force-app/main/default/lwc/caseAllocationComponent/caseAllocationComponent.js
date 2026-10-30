import {LightningElement,wire,track,api} from 'lwc';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import CLUSTER from '@salesforce/schema/Case.Cluster__c';
import insertCollectionAssignmentRec from '@salesforce/apex/CaseAllocateHandler.insertCollectionAssignmentRec';
import getFielddata from '@salesforce/apex/CaseAllocateHandler.getFielddata';
import getPickListValuesIntoList from '@salesforce/apex/CaseAllocateHandler.getPickListValuesIntoList';
import getCaseRecords from '@salesforce/apex/CaseAllocateHandler.getCaseRecords';
import insertCollectionRuleRecords from '@salesforce/apex/CaseAllocateHandler.insertCollectionRuleRecords';
import getSCMforCluster from '@salesforce/apex/CaseAllocateHandler.getSCMforCluster';
import updateSeviceClusterMemberdata from '@salesforce/apex/CaseAllocateHandler.updateSeviceClusterMemberdata';
import getExistingFilterData from '@salesforce/apex/CaseAllocateHandler.getExistingFilterData';
import allocateCollectionCaseRecords from '@salesforce/apex/CaseAllocateHandler.allocateCollectionCaseRecords';
import updateAllocatedCollectionRecords from '@salesforce/apex/CaseAllocateHandler.updateAllocatedCollectionRecords';
import allocateCaseRecordsToAssociates from '@salesforce/apex/CaseAllocateHandler.allocateCaseRecordsToAssociates';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ReportLabel from '@salesforce/label/c.collectionreportlink';
export default class CaseAllocationComponent extends LightningElement {
    @api SCMCol = [{
		label: 'Resource Name',
		fieldName: 'Name'
	},{
        label: 'Active',
	    fieldName:'Active__c',
		type:'boolean',
		editable: true
	}];
	@api columns = [{
		label: 'RuleName',
		fieldName: 'filterName'
	}, {
		label: 'CaseCount',
		fieldName: 'ApexCaseCount'
	}];
	@api CaseCountTable = [{
		label: 'Cluster',
		fieldName:'cluster'
	},{
        label: 'CaseCount',
	    fieldName:'count',
		
	}];
	@api FilterCol = [{
		label: 'Rule Name',
		fieldName: 'rulename'
	}, {
		label: 'Filters',
		fieldName: 'filters'
	}, {
		label: 'Condition',
		fieldName: 'condition'
	}, {
		label: 'CreatedBy',
		fieldName: 'CreatedBy'
	}, {
		label: 'CreatedDate',
		fieldName: 'CreatedDate',
		type: 'date'
	
	}];
    ruleName;
    clusterPicklistOptions;
    clustervalueArr=[];
    agentsClusterArr=[];
	agentsCluster;
    showCreateFilter;
    displayfilters;
    DisplayNotFoundMsg;
    createFlag;
    rowVal = 1;
    keyIndex = 0;
    FilterVal;
	index = 0;
    @track itemList = [{
		id: 0,
		row: this.rowVal,
		value: {
			field: '',
			operator: '',
			value: '',
			condition: '',
			isText: '',
			isPicklist: '',
			isDate: ''
		}
	}];
    mapData = [];
    FieldMap = new Map();
    fieldOptions1 = [];
    fieldVal;
    ValueVal;
    FieldAPIName;
    picklistvalues = [];
	FinalPicklistValues = [];
    ObjectName = 'Case';
    FilterCondition;
    HoldFilterCondition;
    HoldFilterLogic;
    temp=[];
    Filterlogic = [];
    flag;
    MultiPicklistFlag;
    Holdflag;
    querystring = 'select id,CaseNumber,Cluster__c from Case where';
    CaseDataArr =[];
    CaseCountArr=[];
    showCaseCount;
	ExistingRuleDataMap = new Map();
    //@track CollectionObject = [{Cluster__c:'',Collection_Assignment__c:'',Name:'',Query__c:'',Logic__c:'',Condition__c:''}];
	@track CollectionObject = {
		Cluster__c: '',
		Name: '',
		Query__c: ''
	};
    TableData = [];
    SCMTableData=[];
	CollectionRuleIdArr=[];
    SCMCount;
	ActiveClusterMemberdata=[];
	SCMdata;
	draftValues=[];
	ServiceClusterMemberObject=[];
    caseLimit;
    caseAllocationCluster;
    uniqueCaseID=[];
    //collectionCaseArr=[{Id:'',Cluster__c:'',Case_ID__c:'',Collection_Rule__c:'',Assigned_To__c:''}];
	collectionCaseArr=[];
	MainReportLink;
	displayMainReport;
	ExistingFilter;
    FilterTableData = [];
    ExistingFilterName = [];
	SearchData = [];
    SelectedRowQuery;
	Backflag;
	updatedvalue;

    connectedCallback() {
		getFielddata({})
			.then(result => {
				var conts = result;
				conts.forEach((item, index) => {
					this.mapData.push({
						label: item.MasterLabel,
						value: item.DeveloperName
					})
					this.FieldMap.set(item.DeveloperName, item)
				})
				this.fieldOptions1 = JSON.parse(JSON.stringify(this.mapData));
			})
			.catch(error => {
				console.log(error);
			})
            this.showCaseCount=false;
	}
    @wire(getPicklistValues, {
		recordTypeId: '0125g000000af4wAAA',
		fieldApiName: CLUSTER
	})
	wirepicklistValues({
		data,
		error
	}) {
		if (data) {
			this.clusterPicklistOptions = data.values;
			console.log('this.clusterPicklistOptions>>'+JSON.stringify(this.clusterPicklistOptions));
		}
		if (error) {
			console.log('ERROR' + error);
			this.clusterPicklistOptions = undefined;
		}
	}
    handleRuleNameChange(event) {
		this.ruleName = event.detail.value;
        console.log('RULENAME>>>>>'+this.ruleName);
	}
    handleClusterChange(event) {
        let arr =[];
        this.clustervalueArr=event.detail;
        console.log(this.clustervalueArr.length);
        for(let data of this.clustervalueArr){
            arr.push({label:data,value:data});
        }
        this.agentsClusterArr=arr;
        console.log('CLUSTER ARRAY>>'+JSON.stringify(this.agentsClusterArr)); 
      }
    handleCreateRuleName(){
		if(this.clustervalueArr.length<5){
        if (this.ruleName !== undefined && this.ruleName!== null){
            console.log('CLUSTER STRING>>'+JSON.stringify(this.clustervalueArr.join()));
           insertCollectionAssignmentRec({
                    rule: this.ruleName,
                    cluster:this.clustervalueArr.join()
                })
                .then(result => {
					console.log('COLLECTION ASSIGNMENT ID>>'+	result); 
                    this.CollectionAssignmentID = result;
                    console.log('COLLECTION ASSIGNMENT ID>>'+	this.CollectionAssignmentID); 
					this.fetchExistingCollectionRules(this.clustervalueArr.join());
                })
                .catch(error => {
                    console.log('ERROR>>'+JSON.stringify(error));
                })
     }
	}
	else{
		const event = new ShowToastEvent({
			title: 'Error',
			message: 'Please select less than 5 clusters',
			variant: 'Error',
			mode: 'dismissable'
		});
		this.dispatchEvent(event);
	}
	}
	fetchExistingCollectionRules(clusterString){
     console.log('clusterString>>'+clusterString);
	 getExistingFilterData({
			clusterName: clusterString
	   })
	   .then(result=>{
		   console.log('result from apex>>'+JSON.stringify(result));
		   if(result.length>0){
			console.log('INSIDE IF');
		   for(let data of result){
			        this.displayfilters = true;
					this.showCreateFilter = false;
					this.DisplayNotFoundMsg = false;
					this.Backflag=1;
					let dummy = [];
						dummy = [{
							rulename: data.Name,
							filters: data.Logic__c,
							condition: data.Condition__c,
							CreatedBy: data.CreatedBy.Name,
							CreatedDate: data.CreatedDate
						}];
						this.FilterTableData = this.FilterTableData.concat(dummy);
					
				} 
			}
			else {
					console.log('HERE I AM INSIDE ELSE');
					this.DisplayNotFoundMsg = true;
					this.displayfilters = false;
					this.showCreateFilter = false;
					this.Backflag=2;
				}
		
	    })
	   .catch(error=>{
		   console.log('ERROR>>'+error);
	   })	 
	}
	 handleClusterSelect(event){
		console.log('event.detail.value>>>>'+event.detail.value)
		this.updatedvalue=event.detail.value;
		this.agentsCluster=event.detail.value;
		getSCMforCluster({
			clusterName:this.agentsCluster
		})
		.then(result => {
		 if(result.activeClusterMemberData !==undefined){
			this.SCMCount=result.activeClusterMemberData.length;
			this.SCMData = result.clusterMemberDataList;
			this.ActiveClusterMemberdata=result.activeClusterMemberData;
			console.log('ACTIVE CLUSTER MEMBER DATA>>'+JSON.stringify(this.ActiveClusterMemberdata));
			}
		})
		.catch(error => {
			console.log(error);
		})
	}
	handleSave( event ) {
		this.draftValues=event.detail.draftValues;
		console.log('this.draftValues>>'+this.draftValues);
		const inputsItems = this.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
		inputsItems.forEach((item, index) => {
			this.ServiceClusterMemberObject.push({Id:item.fields.Id,Active__c:item.fields.Active__c});
		})
	   updateSeviceClusterMemberdata({clusterName:this.agentsCluster,jsonString: JSON.stringify(this.ServiceClusterMemberObject)})
         .then(result=>{
			 console.log('result>>'+JSON.stringify(result));
			 if(result.activeClusterMemberData !==undefined){
			 this.SCMData=result.clusterMemberDataList;
			 this.ActiveClusterMemberdata=result.activeClusterMemberData;
			 this.SCMCount=result.activeClusterMemberData.length;
			 console.log('ACTIVE CLUSTER MEMBER DATA>>'+this.ActiveClusterMemberdata);
			 const event = new ShowToastEvent({
				title: 'Success',
				message: 'Associates Records Updated Successfully!!',
				variant: 'Success',
				mode: 'dismissable'
			});
			this.dispatchEvent(event);
			this.draftValues=[];
			this.ServiceClusterMemberObject=[];
		}
		})
		 .catch(error=>{
			 console.log(error);
		})
		console.log('SCMData>>>>>>'+JSON.stringify(this.SCMData));
		}
      handlecreateFilter() {
		this.showCreateFilter = true;
		this.displayfilters = false;
		this.DisplayNotFoundMsg = false;
		this.createFlag = true;
        this.flag = true;
	}
     handleBack(){
		if(this.Backflag===1){
        this.showCreateFilter = false;
        this.displayfilters = true;
        this.DisplayNotFoundMsg = false;
		}
		else if(this.Backflag==21){
			this.showCreateFilter = false;
			this.displayfilters = false;
			this.DisplayNotFoundMsg = true;
			}
     }

     get OperatorOptions() {
		return [{
			label: 'Equal To',
			value: '='
		}, {
			label: 'Not Equal To',
			value: '!='
		}, {
			label: 'grater than',
			value: '>'
		}, {
			label: 'less than',
			value: '<'
		}, {
			label: 'grater than equal To',
			value: '>='
		}, {
			label: 'less thanEqual To',
			value: '=<'
		}, ];
	}

	get ConditionOptions() {
		return [{
			label: 'AND',
			value: 'AND'
		}, {
			label: 'OR',
			value: 'OR'
		}];
	}

    handleFieldChange(event) {
		this.fieldVal = event.detail.value;
        console.log('FIELDVAL>>'+this.fieldVal);
		this.itemList[this.keyIndex].value.field = event.detail.value;
		this.handleValueForField(event.detail.value);
	}
	handleValueChange(event) {
		if (this.FieldMap.get(this.fieldVal).Data_Type__c === 'Picklist') {
			this.ValueVal = event.detail;
		}
		else{
			this.ValueVal = event.detail.value;
		}
		console.log('VALUEVAL>>'+this.ValueVal)
		this.itemList[this.keyIndex].value.value = this.ValueVal;
	   }
	handleOperatorChange(event) {
		this.operatorVal = event.detail.value;
		this.itemList[this.keyIndex].value.operator = event.detail.value;
	}
	handleConditionChange(event) {
		this.Conditionvalue = event.detail.value;
		this.itemList[this.keyIndex].value.condition = event.detail.value;
	}
	handleFilterLogic(event) {
		let String1 = event.detail.value;
		this.FilterCondition = String1;
	}
	handleValueForField(FieldName) {
        console.log('FIELDNAME>>'+FieldName+'<<DATATYPE>>'+this.FieldMap.get(FieldName).Data_Type__c);
		if (this.FieldMap.get(FieldName).Data_Type__c === 'Date') {
			this.itemList[this.keyIndex].value.isText = false;
			this.itemList[this.keyIndex].value.isPicklist = false;
			this.itemList[this.keyIndex].value.isDate = true;
		} else if (this.FieldMap.get(FieldName).Data_Type__c === 'Text') {
			this.itemList[this.keyIndex].value.isText = true;
			this.itemList[this.keyIndex].value.isPicklist = false;
			this.itemList[this.keyIndex].value.isDate = false;
		} else if (this.FieldMap.get(FieldName).Data_Type__c === 'Picklist') {
			this.itemList[this.keyIndex].value.isText = false;
			this.itemList[this.keyIndex].value.isPicklist = true;
			this.itemList[this.keyIndex].value.isDate = false;
			this.FieldAPIName = FieldName + '__c';
			getPickListValuesIntoList({
					objectType: this.ObjectName,
					selectedField: this.FieldAPIName
				})
				.then(result => {
                    console.log('RESULT FROM GET PICKLIST VALUES>>'+JSON.stringify(result));
					var conts = result;
					this.picklistvalues = [];
					conts.forEach((item, index) => {
						this.picklistvalues.push({
							label: item,
							value: item
						})
					})
					if (this.FinalPicklistValues.length === 0) {
						this.FinalPicklistValues = JSON.parse(JSON.stringify(this.picklistvalues));
					} else {
						this.FinalPicklistValues = [];
						this.FinalPicklistValues = JSON.parse(JSON.stringify(this.picklistvalues));
					}``
				})
				.catch(error => {
					console.log(error);
				})
		}
	}
    addRow(event) {
		this.rowVal++;
		++this.keyIndex;
		this.itemList.push({
			id: this.keyIndex,
			row: this.rowVal,
			value: {
				field: '',
				operator: '',
				value: '',
				condition: '',
				isText: '',
				isPicklist: '',
				isDate: ''
			}
		});
		if (this.FilterVal === undefined) {
			this.FilterVal = 1 + this.itemList[this.index].value.condition;
		} else {
			this.FilterVal = this.FilterVal + this.itemList[this.index].row + this.itemList[this.index].value.condition;
		}
		this.index++;
	}
    removeRow(event) {
		this.keyIndex--;
		this.rowVal--;
		if (this.itemList.length >= 2) {
			this.itemList = this.itemList.filter(function (element) {
				return parseInt(element.id) !== parseInt(event.target.accessKey);
			});
		}
	}

    handleSearch() {
		//this.displayMainReport = false;
		//this.Limit = 0;
		if (this.FilterCondition === undefined || this.FilterCondition === null) {
			this.FilterCondition = this.FilterVal;
		}
		this.HoldFilterCondition = this.FilterCondition;
		this.temp = this.FilterCondition.split('');
        console.log('TEMP>>'+this.temp);
		for (let index = 0; index < this.temp.length; index++) {
			if (!isNaN(this.temp[index]) && this.temp[index] !== ' ') {
				this.Filterlogic.push(this.temp[index] + '@ ');
			} else {
				this.Filterlogic.push(this.temp[index]);
			}
		}
        console.log('FILETER LOGIC>>'+this.Filterlogic);
		this.FilterCondition = this.Filterlogic.join('');
		console.log('FILETERCONDITION>>'+this.FilterCondition);
		if (this.flag) {
			this.HoldFilterLogic = undefined;
			let quoteExceptionFields;
			for (let i = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].value.field === 'DPD_Bucket' || this.itemList[i].value.field === 'First_EMI_BKT' || this.itemList[i].value.field === 'First_EMI_Date'){
                    quoteExceptionFields = this.itemList[i].value.value;
                }
				else if(this.itemList[i].value.field==='Payment_MP' || this.itemList[i].value.field==='Priority_Collection_Efficiency'|| this.itemList[i].value.field==='EMI_Due_Reason'){
                        console.log('I AM PICKLIST VALE>>'+ this.itemList[i].value.value);
                        let val=this.itemList[i].value.value;//.split(',');
                        console.log('MULTIPICKLIST VALUES>> '+val);
                        let arr;
                        for(let k=0;k<val.length;k++){
                         if(arr===undefined) {
                            if(k!==val.length-1)
                             arr="'"+val[k]+"',";
                            else
                             arr="'"+val[k]+"'";
                         }
                         else
                            if(k!==val.length-1)
                             arr=arr+"'"+val[k]+"',";
                            else
                             arr=arr+"'"+val[k]+"'"; 
                        }
                     console.log('MULTIPICKLIST VALUES ARE>>'+arr);
					 if(this.itemList[i].value.operator==='='){
                     quoteExceptionFields= 'IN  '+'('+ arr +')';
					 }
					 else if(this.itemList[i].value.operator==='!='){
						quoteExceptionFields= 'NOT IN  '+'('+ arr +')';
					 }
                     console.log('STRING>>'+quoteExceptionFields);
                     this.MultiPicklistFlag=true;
                     this.Holdflag=true;
                    }
                    else {
					quoteExceptionFields = "'" + this.itemList[i].value.value + "'";
				}
              if (this.HoldFilterLogic === undefined) {
                   if(this.Holdflag){
					this.HoldFilterLogic = this.itemList[i].value.field + '__c ' +  quoteExceptionFields;
                    this.Holdflag=false;
                   }
                   else
                   this.HoldFilterLogic = this.itemList[i].value.field + '__c ' + this.itemList[i].value.operator + ' ' + quoteExceptionFields + ' ';
				} else {
                    if(this.Holdflag){
                        this.HoldFilterLogic = this.HoldFilterLogic + ';' + this.itemList[i].value.field + '__c ' +  quoteExceptionFields;
                        this.Holdflag=false;
                       }
                       else
					   this.HoldFilterLogic = this.HoldFilterLogic + ';' + this.itemList[i].value.field + '__c ' + this.itemList[i].value.operator + ' ' + quoteExceptionFields + ' ';
				}
               if(this.MultiPicklistFlag){
                this.FilterCondition = this.FilterCondition.replace(this.itemList[i].row + '@', ' ' + this.itemList[i].value.field + '__c ' + quoteExceptionFields );
			    this.MultiPicklistFlag=false;
               }
               else{
				this.FilterCondition = this.FilterCondition.replace(this.itemList[i].row + '@', ' ' + this.itemList[i].value.field + '__c ' + this.itemList[i].value.operator + ' ' + quoteExceptionFields + ' ');
            }
            console.log('HOLDFILETRLOGIC>>'+this.HoldFilterLogic);
        }
		this.querystring = this.querystring + ' ' + this.FilterCondition + ' ' + 'AND';
		for(let singleCluster of this.clustervalueArr){
			let query =this.querystring+ ' Cluster__c=' + "'" + singleCluster + "'";
			//this.queryvar = this.querystring;
            console.log('QUERY AFTER SEARCH>>'+query)
			getCaseRecords({
					queryString: query
				})
				.then(result => {
					console.log('CASES AFTER SEARCH>>'+JSON.stringify(result));
					let dummy =[];
					dummy=[{
						Id:result.length,
						cluster:singleCluster,
						count:result.length
					}];
					console.log('QUERY>>'+query);
					this.CaseDataArr.push({Cluster:singleCluster ,CaseData:result,Query:query});
					console.log('CASEDATA>>'+this.CaseDataArr);
					console.log('CASEDATA>>'+this.CaseDataArr[0].CaseData);
					this.CaseCountArr=this.CaseCountArr.concat(dummy);
				})
				.catch(error => {
					console.log('ERROR>>'+ error.body.message);
					
				})
				query='';
				
			}
			
            this.showCaseCount=true;
			this.FilterCondition = null;
		    this.Filterlogic = [];
		    this.querystring = 'select id,CaseNumber,Cluster__c from Case where';

			//To reset inputs like field,operator and value
			this.template.querySelectorAll('lightning-input[data-name="inputText"]').forEach(element => {
				element.value = null;
			});
			this.template.querySelectorAll('lightning-combobox[data-name="inputPick"]').forEach(element => {
				element.value = null;
			});
			this.rowVal = 1;
			this.FilterVal = undefined;
			this.index = 0;
			this.keyIndex = 0;
			this.itemList = [{
				id: 0,
				row: this.rowVal,
				value: {
					field: '',
					operator: '',
					value: '',
					condition: '',
					isText: '',
					isPicklist: '',
					isDate: ''
				}
			}];
		} else {
			this.searchCasesForExistingFilters(this.FilterCondition);
			
		}
	}
    handleAdd(){
		console.log('here');
		this.AddCollectionRules();
	}
    AddCollectionRules() {
		console.log('Inside add');
		for(let clusterCasedata of this.CaseDataArr){
			this.CollectionObject.Cluster__c = clusterCasedata.Cluster;
			this.CollectionObject.Collection_Assignment__c = this.CollectionAssignmentID;
			this.CollectionObject.Name = this.ruleName + '-' +clusterCasedata.Cluster;
			this.CollectionObject.Query__c = '';
			this.CollectionObject.Logic__c = this.HoldFilterLogic;
			this.CollectionObject.Condition__c = this.HoldFilterCondition;
			console.log('CollectionObject>>'+JSON.stringify(this.CollectionObject));
			insertCollectionRuleRecords({
					jsonString: JSON.stringify(this.CollectionObject),
					caseData: clusterCasedata.CaseData,
				})
				.then(result => {
					this.temp = result;
					this.TableData = [{
						id: 'a',
						filterName: this.temp.Name,
						ApexCaseCount: this.temp.CaseAssigmentRecords__c,
					}]
					this.SCMTableData = this.SCMTableData.concat(this.TableData)
					console.log('SCMTableData>>'+JSON.stringify(this.SCMTableData));
					this.HoldFilterCondition = '';
					this.HoldFilterLogic = '';
				})
				.catch(error => {
					console.log('ERROR>>'+JSON.stringify(error));
				})
			}
       } 
	 
	   handleAllocatecases(event){
        this.caseLimit=event.detail.value;
		console.log('CASELIMIT>>'+this.caseLimit);
	   }
	   generateMainReport() {	
		   console.log('Here I am Inside to generate report'+this.CollectionAssignmentID+'kk'+this.agentsCluster);
		allocateCollectionCaseRecords({
			collectionAssignmentId: this.CollectionAssignmentID,
			cluster:this.agentsCluster,
			caseLimit:this.caseLimit
		})
		.then(result=>{
           console.log('COLLECTION CASE ASSIGNMENT RECORDS>>'+JSON.stringify(result)+'<<LENGTH>>'+result.length);
		   if (this.ActiveClusterMemberdata.length > 0 && result.length > 0){
			  let AssociatesArr=[...this.ActiveClusterMemberdata]; 
			  console.log('AssociatesArr'+JSON.stringify(AssociatesArr));
			  for(let data of result){
				 // console.log('DATA>>'+data);
				this.collectionCaseArr.push({Id:data.Id,Cluster__c:data.Cluster__c,Case_ID__c:data.Case_ID__c,Collection_Rule__c:data.Collection_Rule__c,Assigned_To__c:''});
			  }
			  //console.log('COLLECTION DATA AFTER ADDING ASSIGNED TO>>'+JSON.stringify(this.collectionCaseArr));
			for (let collection of this.collectionCaseArr) {
				//collection = Object.assign({}, collection)
				//console.log('COLLECTION DATA>>'+JSON.stringify(collection));
				//console.log('Assigned To>>'+collection.Assigned_To__c);
				if(!this.uniqueCaseID.includes(collection.Case_ID__c)){
					console.log('AssociatesArr'+JSON.stringify(AssociatesArr));
                 let memberData = AssociatesArr[0];
				 console.log('MEMEBER DATA>>'+JSON.stringify(memberData))
				 collection.Assigned_To__c = memberData.Service_Resource__r.RelatedRecordId;
				 console.log('Assigned To>>'+collection.Assigned_To__c);
				 AssociatesArr.splice(0,1);
				 AssociatesArr.push(memberData);
				 console.log('AssociatesArr after shift>>'+JSON.stringify(AssociatesArr))
				 this.uniqueCaseID.push(collection.Case_ID__c);
				}
			}
			console.log('UNIQUE CASE>>'+this.uniqueCaseID)
			console.log('COLLECTION CASE DATA AFTER UPDATE>>'+JSON.stringify(this.collectionCaseArr))
		   }
		   updateAllocatedCollectionRecords({
			updatedCollectionCaseList:this.collectionCaseArr
		   })
           .then(result=>{
			   console.log(result);
			   if(result==='SUCCESS'){
				this.displayMainReport = true;
				this.MainReportLink = ReportLabel;
				this.MainReportLink = this.MainReportLink+ this.ruleName+'-'+this.agentsCluster;
				console.log('here>>'+this.MainReportLink );
				const event = new ShowToastEvent({
					title: 'Success',
					message:'Report Generated Successfully!',
					variant: 'Success',
					mode: 'dismissable'
				});
				this.dispatchEvent(event);
			   }
		   })
		   .catch(error=>{
			console.log(error);
		})

		})
		.catch(error=>{
			console.log(error);
		})
	   }
	   AllocateCases(){
		   console.log('INSIDE ALLOCATE CASES');
		   allocateCaseRecordsToAssociates({
			collectionAssignmentId: this.CollectionAssignmentID,
			cluster:this.agentsCluster,
			caseLimit:this.caseLimit
		})
		.then(result=>{
			if (result === 'success') {
				const event = new ShowToastEvent({
					title: 'Success',
					message: 'Cases are Allocated to the Associates',
					variant: 'Success',
					mode: 'dismissable'
				});
				this.dispatchEvent(event);
			} else {
				const event = new ShowToastEvent({
					title: 'Error',
					message: 'Batch Is already running',
					variant: 'Error',
					mode: 'dismissable'
				});
				this.dispatchEvent(event);
			}
		})
		.catch(error=>{
          console.log(error);
		})
	   }

	   getSelectedRecfromExistingRulesTable(){
		var selectedRecords =
			this.template.querySelector('lightning-datatable[data-name="inputtable"]').getSelectedRows();
			console.log('SELECTED DATA FROM TABLE>>'+selectedRecords);
		for (let ind = 0; ind < selectedRecords.length; ind++) {
			this.ExistingFilterName.push(selectedRecords[ind].rulename);
			this.prepareDataToSearch(selectedRecords[ind]);
		}
	   }
	   prepareDataToSearch(row) {
		let filterdata;
		let index = 1;
		filterdata = row.filters.split(';');
		for (let data of filterdata) {
			if (data !== '' && data !== '__c'){
				this.SearchData.push({
					row: index,
					item: data
				});
				index++;
			}
		}
		this.FilterCondition = row.condition;
		this.flag = false;
		this.handleSearch();
	}
	searchCasesForExistingFilters(input){
		console.log('INPUT>>'+input);
		for (let data of this.SearchData) {
			input = input.replace(data.row + '@', ' ' + data.item + ' ');
		}
		if (this.SelectedRowQuery === undefined || this.SelectedRowQuery === '') {
			this.SelectedRowQuery = '( ' + input + ' )';
		} 
		console.log('SelectedRowQuery>>'+this.SelectedRowQuery);
		this.SearchData = [];
		this.FilterCondition = '';
		this.Filterlogic = [];
		this.querystring = 'select id,Cluster__c,CaseNumber from case where ' + '(' + this.SelectedRowQuery + ')' + ' ' + 'AND';
		for(let singleCluster of this.clustervalueArr){
			let query=this.querystring+' Cluster__c=' + "'" + singleCluster + "'";
			console.log('QUERY AFTER SEARCH>>'+query)
			getCaseRecords({
					queryString: query
				})
				.then(result => {
					console.log('CASES AFTER SEARCH>>'+JSON.stringify(result));
					let dummy =[];
					dummy=[{
						Id:result.length,
						cluster:singleCluster,
						count:result.length
					}];
					console.log('dummy>>'+JSON.stringify(dummy));
					this.CaseDataArr.push({Cluster:singleCluster ,CaseData:result,Query:query});
					//console.log('CASEDATA>>'+JSON.stringify(this.CaseDataArr));
					//console.log('CASEDATA>>'+this.CaseDataArr[0].CaseData);
					this.CaseCountArr=this.CaseCountArr.concat(dummy);
					console.log('CaseCountArr>>'+JSON.stringify(this.CaseCountArr));
				})
				.catch(error => {
					console.log('ERROR>>'+ error.body.message);
					
				})
				query='';
		}
		this.showCaseCount=true;
		this.querystring = 'select id,CaseNumber,Cluster__c from Case where';
		console.log('CaseCountArr>>'+this.CaseCountArr);
	}
}