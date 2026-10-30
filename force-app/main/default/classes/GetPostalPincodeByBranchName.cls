public class GetPostalPincodeByBranchName {
    
    @AuraEnabled
    public static void getPincode(String branchName){
        system.debug('branchName>'+branchName);
    }

}