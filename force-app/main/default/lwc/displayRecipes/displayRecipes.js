import { LightningElement } from 'lwc';
import getRandomRecipes from '@salesforce/apex/GetRecipeDetails.getRandomRecipe';
export default class DisplayRecipes extends LightningElement {
  recipeDetails={};
  recipeMap=[];
  recipeObj ={instructions:'',analyzedInstructions:''};
    handlegetRandomRecipes(){
        getRandomRecipes({})
        .then(result=>{
          this.recipeDetails=result;
          this.recipeDetails.recipes.forEach(element => {
            this.recipeMap.push({key:element.title,value:{instructions:element.instructions,analyzedInstructions:element.analyzedInstructions}})
          });
          console.log('result>>1'+JSON.stringify(this.recipeMap));
          console.log('result>>2'+JSON.stringify(this.recipeDetails.recipes[0].image));
        })
        .catch(error=>{
         console.log(error);
        })
    }
    handleGetDetails(event){
        console.log('>>>>>>>>>.'+event.target.value);
        let temp = event.target.value;
        console.log('>>>>>>>>>.88'+temp);
        console.log('here i am '+this.recipeMap.has(temp));
        console.log('detaiuoiils>>>'+this.recipeMap.get(temp));
       /*Object.keys(this.recipeMap).forEach((key) => {
        console.log(this.recipeMap[key]); 
        this.instructions = this.recipeMap[key];
      });*/
     }
}