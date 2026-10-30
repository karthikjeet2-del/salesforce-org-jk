import { LightningElement } from 'lwc';
import BOOK_LOGO from '@salesforce/resourceUrl/CrazyLogo';
import GETBOOKGENRE from '@salesforce/apex/BookWebsiteHandler.getBookGenres';
export default class BookHeaderComponent extends LightningElement {

    bookLogo = BOOK_LOGO;
    bookGenreList=[];
    getBookGenres(event){
        GETBOOKGENRE({})
            .then(result=>{
               this.bookGenreList = result;
               console.log('this.bookGenreList>'+this.bookGenreList);
            })
            .catch(error=>{
             console.log('error>'+error);
            })
    }
    handleGenreClick(event){
        console.log('Genre>'+event.detail.value);
    }
    handleAbout(){

    }
    handleContact(){

    }
}