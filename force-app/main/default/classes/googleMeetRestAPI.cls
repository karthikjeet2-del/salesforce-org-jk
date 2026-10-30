public class googleMeetRestAPI {
    @Future(callout=true)
    public static void sendRequestmethod(Set<Id> meetingIdset){
        system.debug('meetingIdset>>>>'+meetingIdset);
        meetWrapper meetWrap=new meetWrapper();
        List<Event> meetingDetails=[select id,StartDateTime,subject,EndDateTime,Who.Email,Who.Phone,CreatedBy.SenderEmail from Event where id in:meetingIdset];  
        for(Event e:meetingDetails){
        system.debug('meetingDetails>>>>>'+e.Who.Email);
        system.debug('meetingDetails>>>>>'+e.Who.Phone);
        system.debug('meetingDetails>>>>>'+e.CreatedBy.SenderEmail);
        system.debug('meetingDetails>>>>>'+e.Who.Phone);
        }
        for(Event ee : meetingDetails){
             meetOrganiser meetOrg=new meetOrganiser();
             meetOrg.oEmail=ee.CreatedBy.SenderEmail;
             system.debug('meetOrg>>>'+meetOrg);
             meetParticipant meetP=new meetParticipant();
             meetP.pEmail=ee.Who.Email;
             meetP.mobNo=ee.Who.Phone;
            list<meetParticipant> s= new list<meetParticipant>();
            s.add(meetP);
            system.debug('s>>>>>'+s);
            meetWrap.starts_at=ee.StartDateTime;
            meetWrap.ends_at=ee.EndDateTime;
            meetWrap.title=ee.subject;
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
        //request.setbody(JSON.serialize(meetWrap));
        request.setbody('{ "starts_at": "2021-08-05T19:01:04.086938+05:30", "title": "stage Meeting", "ends_at": "2021-08-05T19:25:04.086938+05:30", "organiser": { "email": "karthika.j@byjus.com" }, "participants": [  { "email":"bhadrakarthik.j@.com", "phone": "+91-7019021890" } ] }');
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