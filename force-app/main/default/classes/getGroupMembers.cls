public class getGroupMembers {

    
    public static void returnGMs(String publicGroup){
        Set<Id> allUsersList = new Set<Id>();
        Set<Id> groupIds = new Set<Id>();
        Map<Id,Group> groupMap = new Map<Id,Group>([SELECT Id,Name,(SELECT GroupId,UserOrGroupId FROM GroupMembers) FROM Group WHERE Name =: publicGroup AND Type='Regular']);
        for(GroupMember grp : groupMap.values().GroupMembers){
            if(grp.UserOrGroupId.getSObjectType().getDescribe().name == 'User'){
                system.debug('MemberType1>>'+grp.UserOrGroupId.getSObjectType().getDescribe().name);
                    allUsersList.add(grp.UserOrGroupId);
                }
                else{
                    system.debug('MemberType2>>'+grp.UserOrGroupId.getSObjectType().getDescribe().name);
                    groupIds.add(grp.UserOrGroupId);
                }
            }
        system.debug('groupIds>>'+groupIds);
        for(Group childGroup : [SELECT Id,(SELECT Id,UserOrGroupId FROM GroupMembers) FROM Group WHERE Id IN: groupIds]){
            for(GroupMember childGM :childGroup.GroupMembers){
            if(childGM.UserOrGroupId.getSObjectType().getDescribe().name == 'User'){
            allUsersList.add(childGM.UserOrGroupId);
            }
        }
        }
        System.debug('allUsersList>>>'+allUsersList);
      }
}