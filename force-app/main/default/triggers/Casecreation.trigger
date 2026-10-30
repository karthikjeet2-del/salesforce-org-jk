trigger Casecreation on Case (before insert) {
for(Case c: Trigger.new){
c.Description = 'Case created successfully by using Casecreation trigger';
}
}