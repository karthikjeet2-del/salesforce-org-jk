public class UpdateDuplicateLeadForRize {
    
    public static void checkDuplicateLead(List<Lead> rizeLeadList){
        system.debug('rizeLeadList>'+rizeLeadList);
        if(!rizeLeadList.isEmpty()){
            Map<String,Lead> duplicateMap = new Map<String,Lead>();
            Set<String> emailSet = new Set<String>();
            Set<String> phoneSet = new Set<String>();
            List<Lead> updateLeads = new List<Lead>();
            for(Lead rizeLead : rizeLeadList){
                if(rizeLead.Email !=null || rizeLead.Phone != null){
                    emailSet.add(rizeLead.Email);
                    phoneSet.add(rizeLead.Phone);
                    duplicateMap.put(rizeLead.Email,rizeLead);
                }
            }
            for(Lead duplicateLead : [SELECT Id,Email,Phone FROM Lead WHERE (Email IN:emailSet OR Phone IN:phoneSet)]){
                system.debug('Here My brave hero\'s Duplicate Lead :)'+duplicateLead);
                Lead newLead = duplicateMap.get(duplicateLead.Email);
                newLead.Id = duplicateLead.Id;
                updateLeads.add(newLead);
            }
            system.debug('Here My brave hero\'s Duplicate Lead List:)'+updateLeads);
            if(updateLeads.size()>0){
                database.update(updateLeads,false);
            }
        }
    }  
}