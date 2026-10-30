public class google{
    @Future(callout=true)
    public static void sendRequestmethod(Set<Id> meetingIdset){
       system.debug('meetingIdset>>>>'+meetingIdset);
       meetWrapper meetWrap=new meetWrapper();
        List<EventC__c> meetingDetails=[select id,Email2__c,Email1__c,End__c,Phone__c,Start__c,Title__c from EventC__c where id in:meetingIdset];  
        for(EventC__c e:meetingDetails){
        system.debug('meetingDetails>>>>>'+e.Email1__c);
        system.debug('meetingDetails>>>>>'+e.Title__c);
        system.debug('meetingDetails>>>>>'+e.Email2__c);
        system.debug('meetingDetails>>>>>'+e.Phone__c);
        }
        for(EventC__c ee : meetingDetails){
             meetOrganiser meetOrg=new meetOrganiser();
             meetOrg.oEmail=ee.Email2__c;
             system.debug('meetOrg>>>'+meetOrg);
             meetParticipant meetP=new meetParticipant();
             meetP.pEmail=ee.Email1__c;
             meetP.mobNo=ee.Phone__c;
            list<meetParticipant> s= new list<meetParticipant>();
            s.add(meetP);
            system.debug('s>>>>>'+s);
            meetWrap.starts_at=ee.Start__c;
            meetWrap.ends_at=ee.End__c;
            meetWrap.title=ee.Title__c;
            meetWrap.organiser=meetOrg;
            meetWrap.participants=s;
        }
        system.debug('meetWrap>>>>>>>>>'+meetWrap);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://mentors-meet-stg.byjusschools.com/v1/meetings');
        request.setMethod('GET');
        request.setheader('Authorization','EpTHfJyhPIsgGVtxKGNvdh+xi/igx8Za/SCr+8SrzuQ=');
        request.setheader('Content-Type','application/json');
        request.setbody(JSON.serialize(meetWrap));
        //request.setbody('{ "starts_at": "2021-08-05T19:01:04.086938+05:30", "title": "stage Meeting", "ends_at": "2021-08-05T19:25:04.086938+05:30", "organiser": { "email": "karthika.j@byjus.com" }, "participants": [  { "email":"bhadrakarthik.j@.com", "phone": "+91-7019021890" } ] }');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {
            system.debug('Response>>>>>>'+response);
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            system.debug('results>>>>>>'+results);
        }
   }
    
  public class meetWrapper{
    public datetime starts_at;
    public datetime ends_at;  
    public string title;
    public meetOrganiser organiser;
    public List<meetParticipant> participants;
    }
  public class meetOrganiser{
    public string oEmail;  
    //public string phoneNo;   
    }
  public class meetParticipant{
    public string pEmail;  
    public string mobNo;   
    }
    
}