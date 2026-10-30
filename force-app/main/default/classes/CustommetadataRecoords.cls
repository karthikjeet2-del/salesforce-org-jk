/**
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Class Name      : CustommetadataRecoords
 * Author          : <YourName>
 * Created Date    : Aug 8, 2026
 * Last Modified By: <YourName>
 * Last Modified On: Aug 8, 2026
 * Description     : This class implements for......
 *  
 * Change History  :
 *  Date          │   Author     │   Change
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 *  Aug 8, 2026  │ <YourName>   │ Initial version
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 */

public class CustommetadataRecoords {

	@AuraEnabled(cacheable=true)
	public static List<Close_Plan_Section__mdt> getCustomMetadataRecords() {
        List<Close_Plan_Section__mdt> closeplanList = [SELECT Label,(SELECT Question__c,Score_Percent__c FROM Close_Plan_Questionarrie__r) FROM Close_Plan_Section__mdt];
        if(!closeplanList.isEmpty()){
            return closeplanList;
        }
        return null;
	}

}