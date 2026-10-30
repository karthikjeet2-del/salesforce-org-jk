/*********************************************************************************************
 * NAME:  ExceptionHandler.cls
 * DESCRIPTION: To handle the exceptions and errors during various executions and transactions
 *              including apex classes, triggers, batches, LWC etc into 'Error_Log__c' object.
 *
 *              Method for Apex Exception Handling      - logException()
 *              Method for LWC Exception Handling       - exceptionHandlerLWC()
 *              Method for Batch Exception Handling     - exceptionHandlerForBatches()
 *              Method to fetch Exception Log details   - getErrorLogDetails()
 *
 * @AUTHOR: Chintan Chandresha
 * @DATE: 18/08/2021
 *
 * MODIFICATION LOG:
 * DEVELOPER                         DATE                               DESCRIPTION
 * -----------------------------------------------------------------------------------------
 * Balaji Kotte                     06/05/2020                   Created the first version.
 * Chintan Chandresha               26/10/2020                   Added execution switch controlled by custom metadata: ExceptionHandlingSwitch__mdt.
*********************************************************************************************/
public without sharing class ExceptionHandler {

    /**
    * @description - Check the "ExceptionHandlingSwitch" custom metadata's "Global" record value to confirm the execution of methods.
    * @author ChangeMeIn@UserSettingsUnder.SFDoc | 10-27-2021
    * @return Boolean
    **/
    private static Boolean checkExceptionSwitch(){
        //ExceptionHandlingSwitch__mdt test = ExceptionHandlingSwitch__mdt.getInstance('Global');
        return  false;
    }

    /***********************************************************************
    * @description - To store the exceptions and errors in the 'Error_Log__c' during apex execution from classes, controllers and triggers.
    * @author Balaji Kotte   | 10-19-2021
    * @param sClass
    * @param sClassMethod
    * @param objectName
    * @param recId
    * @param sSeverity
    * @param e
    * @param sAddlErrorInfo
    * @return Map<String, Object>
    ************************************************************************/
    public static Map<String, Object> logException(String sClass,String sClassMethod, String objectName, String recId, String sSeverity, Exception e, String sAddlErrorInfo){
        if (checkExceptionSwitch()) {
            Map<String, Object> mapErrorInfo = new Map<String, Object>{};
            mapErrorInfo.put('Class_Name__c', sClass);
            mapErrorInfo.put('Method_Name__c', sClassMethod);
            mapErrorInfo.put('Object_Name__c', objectName);
            mapErrorInfo.put('Related_To_Id__c', recId);
            mapErrorInfo.put('Severity__c', sSeverity);
            mapErrorInfo.put('User_Info__c', UserInfo.getUserId());
            mapErrorInfo.put('Additional_Info__c', sAddlErrorInfo);
            mapErrorInfo.put('Error_Source__c', 'Server');
            if(e != Null){
                mapErrorInfo.put('Exception_Message__c', e.getTypeName() + ' -->>> ' + e.getMessage());
                mapErrorInfo.put('Stack_Trace__c', e.getStackTraceString());
                mapErrorInfo.put('Error_Cause__c', e.getCause());
                List<String> aDMLFieldNames = new List<String>();
                List<String> aDMLRecordIds = new List<String>();
                List<String> aDMLMessages = new List<String>();
                if(e.getTypeName() == 'System.DmlException')    {
                    for(Integer i=0; i<e.getNumDml(); i++)  {
                        aDMLFieldNames.add(JSON.serialize(e.getDmlFieldNames(i)));
                        aDMLRecordIds.add(e.getDmlId(i));
                        aDMLMessages.add(e.getDmlMessage(i));
                    }
                }
                mapErrorInfo.put('DML_RecordIds__c', aDMLRecordIds);
                mapErrorInfo.put('DML_FieldName__c', aDMLFieldNames);
                mapErrorInfo.put('DML_Error_Message__c', aDMLMessages);
            }
            String sErrorInfoUpd = JSON.serialize(mapErrorInfo);
            if(!(System.isFuture() || System.isBatch() || System.isScheduled()))
            {
                insertErrorRecord(sErrorInfoUpd);
            }
            else
            {
                insertErrorRecordAsyncMode(sErrorInfoUpd);
            }
            return mapErrorInfo;
        }else {
            return null;
        }
    }
    public static Error_Log__c createErrorLogWithoutInsertion(String sClass, String sClassMethod, String objectName, String recId, String sSeverity, Exception objException, String sAddlErrorInfo) {
        if (checkExceptionSwitch()) {
            Error_Log__c errorLog = new Error_Log__c();
            errorLog.Class_Name__c = sClass;
            errorLog.Method_Name__c = sClassMethod;
            errorLog.Object_Name__c = objectName;
            errorLog.Related_To_Id__c = recId;
            errorLog.Severity__c = sSeverity;
            errorLog.User_Info__c = UserInfo.getUserId();
            errorLog.Additional_Info__c = sAddlErrorInfo;
            errorLog.Error_Source__c = 'Server';
            errorLog.Class_Name__c = sClass;

            if (objException != null) {
                errorLog.Exception_Message__c = objException.getTypeName() + ' -->>> ' + objException.getMessage();
                errorLog.Stack_Trace__c = objException.getStackTraceString();
                List<String> aDMLFieldNames = new List<String>();
                List<String> aDMLRecordIds = new List<String>();
                List<String> aDMLMessages = new List<String>();
                if (objException.getTypeName() == 'System.DmlException') {
                    //Type casting the Exception object to DMLException for intrinsic use of the DMLException methods in the for loop below.
                    System.DmlException dmlException = (System.DmlException) objException;
                    System.debug(dmlException);
                    for (Integer i = 0; i < dmlException.getNumDml(); i++) {
                        aDMLFieldNames.add(JSON.serialize(dmlException.getDmlFieldNames(i)));
                        aDMLRecordIds.add(dmlException.getDmlId(i));
                        aDMLMessages.add(dmlException.getDmlMessage(i));
                    }
                }
                errorLog.DML_RecordIds__c = String.join(aDMLRecordIds, ',');
                errorLog.DML_FieldName__c = String.join(aDMLFieldNames, ',');
                errorLog.DML_Error_Message__c = String.join(aDMLMessages, ',');
            }
            return errorLog;
        } else {
            return null;
        }
    }


    /**
    * @description - To log errors and exceptions during LWC executions into the 'Error_Log__c' object.
    * @author Balaji Kotte  | 10-19-2021
    * @param compName
    * @param methodName
    * @param objectName
    * @param recId
    * @param sSeverity
    * @param error
    **/
    @AuraEnabled
    public static void exceptionHandlerLWC(String compName, String methodName, String objectName, String recId, String sSeverity, String error){
        if (checkExceptionSwitch()) {
            try{
                Map<String, Object> mapErrorInfo = new Map<String, Object>{};
                mapErrorInfo.put('Class_Name__c', compName);
                mapErrorInfo.put('Method_Name__c', methodName);
                mapErrorInfo.put('Error_Source__c', 'Client');
                mapErrorInfo.put('Object_Name__c', objectName);
                mapErrorInfo.put('Related_To_Id__c', recId);
                mapErrorInfo.put('Severity__c', sSeverity);
                mapErrorInfo.put('Exception_Message__c', error);
                String sErrorInfoUpd = JSON.serialize(mapErrorInfo);
                if(!(System.isFuture() || System.isBatch() || System.isScheduled()))
                {
                    insertErrorRecord(sErrorInfoUpd);
                }
                else
                {
                    insertErrorRecordAsyncMode(sErrorInfoUpd);
                }
            }catch(Exception e){
                Throw new AuraHandledException(e.getMessage());
            }
        }
    }

    /**
    * @description - To log errors from Async executions into the 'Error_Log__c' object.
    * @author Balaji Kotte  | 10-19-2021
    * @param sErrorInfo
    * @return
    **/
    @future
    public static void insertErrorRecord(String sErrorInfo){
        if (checkExceptionSwitch()) {
            Map<String, Object> mapErrorDetails = (Map<String, Object>) JSON.deserializeUntyped(sErrorInfo);
            List<Error_Log__c> lstAppErrorLogs = new List<Error_Log__c>();
            lstAppErrorLogs.add(getErrorLogDetails(mapErrorDetails));

            if(lstAppErrorLogs != NULL && !lstAppErrorLogs.isEmpty()){
                insert lstAppErrorLogs;
            }
        }
    }

    /**
    * @description
    * @author Balaji Kotte | 10-19-2021
    * @param sErrorInfo
    **/
    public static void insertErrorRecordAsyncMode(String sErrorInfo){
        if (checkExceptionSwitch()) {
            Map<String, Object> mapErrorDetails = (Map<String, Object>) JSON.deserializeUntyped(sErrorInfo);
            List<Error_Log__c> lstAppErrorLogs = new List<Error_Log__c>();
            lstAppErrorLogs.add(getErrorLogDetails(mapErrorDetails));

            if(lstAppErrorLogs != NULL && !lstAppErrorLogs.isEmpty()){
                insert lstAppErrorLogs;
            }
        }
    }

    /**
    * @description - To log errors and exceptions during the batch executions into 'Error_Log__c' object.
    * @author Balaji Kotte | 10-19-2021
    * @param sClass
    * @param objectName
    * @param sSeverity
    * @param ErrorList
    * @param sObjLst
    **/
    public static void exceptionHandlerForBatches(String sClass,String objectName, String sSeverity, Database.SaveResult[] ErrorList, List<SObject> sObjLst) {
        if (checkExceptionSwitch()) {
            List< Map<String, Object>> allmapErrorInfo = new List< Map<String, Object>>();
            if(!ErrorList.IsEmpty()){
                for(Integer i=0; i < ErrorList.size(); i++) {
                    if(!ErrorList.get(i).isSuccess()) {
                        Database.Error errors =  ErrorList.get(i).getErrors().get(0);
                        Map<String, Object> mapErrorInfo = new Map<String, Object>{};
                        mapErrorInfo.put('Class_Name__c', sClass);
                        mapErrorInfo.put('Object_Name__c', objectName);
                        mapErrorInfo.put('Severity__c', 'Medium');
                        mapErrorInfo.put('User_Info__c', UserInfo.getUserId());
                        mapErrorInfo.put('Exception_Message__c',errors.getMessage());
                        mapErrorInfo.put('DML_FieldName__c', errors.getFields());
                        mapErrorInfo.put('Additional_Info__c', String.valueOf(errors.getStatusCode()));
                        if(sObjLst != NULL){
                            mapErrorInfo.put('Related_To_Id__c', String.valueOf(sObjLst.get(i).Id));
                        }
                        allmapErrorInfo.add(mapErrorInfo);
                    }
                }
            }

            if(allmapErrorInfo != NULL && !allmapErrorInfo.isEmpty()){
                insertErrorRecordForBatches(allmapErrorInfo);
            }
        }
    }


    /**
    * @description
    * @author Balaji Kotte | 10-19-2021
    * @param mapErrorDetails
    **/
    public static void insertErrorRecordForBatches(List< Map<String, Object>> mapErrorDetails){
        if (checkExceptionSwitch()) {
            List<Error_Log__c> lstAppErrorLogs = new List<Error_Log__c>();
            for(Integer i=0;I<mapErrorDetails.size(); i++){
                lstAppErrorLogs.add(getErrorLogDetails(mapErrorDetails[i]));
            }
            if(lstAppErrorLogs != NULL && !lstAppErrorLogs.isEmpty()){
                insert lstAppErrorLogs;
            }
        }
    }

    /**
    * @description
    * @author Balaji Kotte | 10-19-2021
    * @param mapErrorDetails
    * @return Error_Log__c
    **/
    public static Error_Log__c getErrorLogDetails( Map<String, Object> mapErrorDetails ) {
        String sErrorSource = '';
        String sClassMethod = '' ;
        String sClassName = '';
        String sCmpName = '';
        String sCmpMethod = '';
        String sErrorMessage = '';
        String sStackTrace = '' ;
        String sLanguage = '' ;
        String sStatus = '' ;
        String sRecordType = '';
        String sObjName = '';
        String sRecId = '';
        String componentName='';
        String componentMethod='';

        Error_Log__c oAppErrorLog = new Error_Log__c ();


        /* class information */
        if(isMapValString(mapErrorDetails, 'Class_Name__c'))    {
            sClassName = (String)mapErrorDetails.get('Class_Name__c');
            oAppErrorLog.Class_Name__c = sClassName;
        }
        if(isMapValString(mapErrorDetails, 'Method_Name__c'))    {
            sClassMethod = (String)mapErrorDetails.get ('Method_Name__c') ;
            oAppErrorLog.Method_Name__c= sClassMethod;
        }

        if(isMapValString(mapErrorDetails, 'Error_Source__c'))    {
            sErrorSource = (String)mapErrorDetails.get ('Error_Source__c') ;
            oAppErrorLog.Error_Source__c= sErrorSource;
        }

        /* Object and Record information */
        if(isMapValString(mapErrorDetails, 'Object_Name__c'))    {
            sObjName = (String)mapErrorDetails.get('Object_Name__c');
            oAppErrorLog.Object_Name__c = sObjName;
        }

        if(isMapValString(mapErrorDetails, 'Related_To_Id__c'))  {
            sRecId = (String)mapErrorDetails.get('Related_To_Id__c');
            oAppErrorLog.Related_To_Id__c= sRecId;
        }

        /* generic error information */
        if(isMapValString(mapErrorDetails, 'Exception_Message__c'))    {
            sErrorMessage = ( String)mapErrorDetails.get('Exception_Message__c') ;
            oAppErrorLog.Exception_Message__c= trimFieldValue(sErrorMessage, 1000);
        }
        if(isMapValString(mapErrorDetails, 'Severity__c'))    {
            oAppErrorLog.Severity__c = (String)mapErrorDetails.get ('Severity__c');
        }
        if(isMapValString(mapErrorDetails, 'Stack_Trace__c'))    {
            sStackTrace = (String)mapErrorDetails.get('Stack_Trace__c');
            oAppErrorLog.Stack_Trace__c= trimFieldValue(sStackTrace, 32768);
        }
        /*  if(isMapValString(mapErrorDetails, System.Label.Component_Name))    {
             componentName = (String)mapErrorDetails.get(System.Label.Component_Name);
              oAppErrorLog.Component_Name__c = componentName;
              oAppErrorLog.Source_of_error__c = System.Label.Client;
          }*/
        if(isMapValString(mapErrorDetails, 'Method_Name__c'))    {
            componentMethod = (String)mapErrorDetails.get('Method_Name__c');
            oAppErrorLog.Method_Name__c = componentMethod;
        }

        /* error cause information */
        String sErrorCause = '' ;
        if(mapErrorDetails.containsKey('DML_Error_Message__c'))    {
            List<String> lstDMLMessages = new List<String>();
            for(Object obj: (List<Object>) mapErrorDetails.get('DML_Error_Message__c'))  {
                lstDMLMessages.add(String.valueOf(obj));
            }
            List<String> lstDMLRecordIds = new List<String>();
            if(mapErrorDetails.containsKey('DML_RecordIds__c'))    {
                for(Object obj: (List<Object>) mapErrorDetails.get('DML_RecordIds__c'))   {
                    lstDMLRecordIds.add(String.valueOf(obj));
                }
            }
            List<String> lstDMLFieldNames  = new List<String>();
            if(mapErrorDetails.containsKey('DML_FieldName__c'))    {
                for(Object obj: (List<Object>) mapErrorDetails.get('DML_FieldName__c')) {
                    lstDMLFieldNames.add(String.valueOf(obj));
                }
            }
            if(!lstDMLMessages.IsEmpty()) {
                Integer iErrorMsgSize = lstDMLMessages.Size() ;
                if (iErrorMsgSize > 0) {
                    for(Integer i=0; i < iErrorMsgSize; i++) {
                        sErrorCause += (i < lstDMLRecordIds.size() ? (String.isNotBlank(lstDMLRecordIds[i]) ? 'DML Record Id: ' + lstDMLRecordIds[i] : ''): '');
                        sErrorCause += String.isNotBlank(sErrorCause) ? ' >> ' : '';
                        sErrorCause += String.isNotBlank(lstDMLMessages[i]) ? 'DML Message: ' + lstDMLMessages[i] : '';
                        sErrorCause += String.isNotBlank(sErrorCause) ? ' >> ' : '';
                        sErrorCause += (i < lstDMLFieldNames.size() ? (String.isNotBlank(lstDMLFieldNames[i]) ? 'DML Field Names: ' + lstDMLFieldNames[i] : ''): '');
                        sErrorCause += String.isNotBlank(sErrorCause) ? ' |' : '';
                    }
                }
            }
        }
        if (!String.IsBlank(sErrorCause)) {
            sErrorCause = sErrorCause.substringBeforeLast ( '|') ;
        }
        if(isMapValString(mapErrorDetails, 'Additional_Info__c'))    {
            sErrorCause = (String)mapErrorDetails.get('Additional_Info__c') + ' ;; ' + sErrorCause;
            oAppErrorLog.Additional_Info__c = sErrorCause ;
        }

        /* user information */
        if(isMapValString(mapErrorDetails, 'User_Info__c'))    {
            oAppErrorLog.User_Info__c = (String)mapErrorDetails.get('User_Info__c') ;
        }

        if(isMapValString(mapErrorDetails, 'Related_To_Id__c'))    {
            oAppErrorLog.Related_To_Id__c = (String)mapErrorDetails.get('Related_To_Id__c') ;
        }

        return oAppErrorLog;
    }

    /**
    * @description
    * @author Balaji Kotte | 10-19-2021
    * @param mapObject
    * @param key
    * @return Boolean
    **/
    public static Boolean isMapValString(Map<String, Object> mapObject, String key)    {
        return mapObject.containsKey(key) && String.isNotBlank((String)mapObject.get(key));
    }

    /**
    * @description
    * @author Balaji Kotte | 10-19-2021
    * @param sFieldValue
    * @param iLengthLimit
    * @return String
    **/
    public static String trimFieldValue(String sFieldValue, Integer iLengthLimit)    {
        return (sFieldValue.length() > iLengthLimit) ? sFieldValue.substring(0, iLengthLimit) : sFieldValue;
    }


}