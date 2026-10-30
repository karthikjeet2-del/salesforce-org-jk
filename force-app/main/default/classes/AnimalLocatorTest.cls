@istest
public class AnimalLocatorTest {
    @istest static void testmethod1(){
      Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());  
        String response = AnimalLocator.getAnimalNameById(2);
    
    }
}