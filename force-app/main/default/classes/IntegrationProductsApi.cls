@RestResource(urlMapping='/Product/')
global class IntegrationProductsApi {
    
    @httpget
    global static List<Product2> getProducts(){
        Map<String,string> reqParams =  RestContext.request.params;
        string prodId = reqParams.get('Id');
        system.debug('prodId>'+prodId);
        List<Product2> productList=[select Id,ProductCode,Name from Product2 where Id=:prodId];
        system.debug('productList>'+productList);
        if(productList.size()>0){
            return productList;
        }
        return null;
    }
    @httppost
    global static Product2 insertProducts(string Name,string ProductCode){
        Product2 newProd = new Product2(Name=Name , ProductCode=ProductCode);
        insert newProd;
        return newProd;
    }
    @httpput
    global static Product2 updateProducts(string Name,string ProductCode){
        Product2 newProd = new Product2(Name=Name , ProductCode=ProductCode);
        Update newProd;
        return newProd;
    }
    @httppatch
    global static Product2 upsertProducts(string Name,string ProductCode){
        Product2 newProd = new Product2(Name=Name , ProductCode=ProductCode);
        upsert newProd;
        return newProd;
    }
    @httpdelete
    global static string deleteProducts(){
      Map<String,String> params= RestContext.request.params;
        String prodId= params.get('Id');
        Product2 prod= [select id from Product2 where Id=:prodId];
        delete prod;
        return 'product deleted';
    }
}