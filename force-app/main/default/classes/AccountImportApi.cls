@restresource(urlmapping='/Accounts/*')
global class AccountImportApi {

    @httpget
    global static Account getAccountById(){
      Restrequest request = restcontext.request;
        system.debug('request>>>>>>>..'+request);
      String accid = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        return [Select id,Name from account where id=:accId];
    }
    
}