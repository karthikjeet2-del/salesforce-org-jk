trigger FeedItemTrigger on FeedItem (before delete) {
    if(trigger.isDelete && trigger.isBefore){
        system.debug('Trigger.new>'+Trigger.old);
        User uRecord = [SELECT Id,Profile.Name FROM User WHERE Id = :UserInfo.getUserId()];
        if(!Label.userProfiles.split(',').contains(uRecord.profile.name)){
            for(FeedItem item : Trigger.old){
                item.addError('You don\' have sufficient permission to delete this post');
            }
        }
    }
    
    
}