trigger Casetrigger on Case (before insert) {
//list<user> profile=new list<user>();
    for(case c1:trigger.new){
        system.debug('>>....'+c1.owner.name);
    string cvar=c1.Owner.Name;
        system.debug('cvar>>>>>>>'+cvar);
    List<String> res = cvar.split(' ', 2);
    system.debug('fNDl'+res);
    user profile=[select user.profile.name from user,user.profile where user.FirstName=:res[0] And user.LastName=:res[1]];
        if(profile.profile.name=='Computer Science Teacher'||profile.profile.name=='Standard Platform User'||profile.profile.name=='System Administrator'){
        system.debug('profile>>>'+profile.profile.name);
       // c1.Profile__c
        c1.Raised_By__c=profile.profile.name;
        insert c1;
    }}
 

}