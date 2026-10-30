import { LightningElement ,track} from 'lwc';
import getVideos from '@salesforce/apex/YTController.getYTVideos';
import getChannelDetails from '@salesforce/apex/YTController.getChannelDetails';
export default class YTSearchPlayer extends LightningElement {
    @track finalresult = [];
    @track finalError = '';
    @track searchInput = 'Hum Jeetenge';
    @track videoResults = [];
    @track viewUrl = '';
    @track channelUrl='';
    @track showChannelpage=false;
    @track channelDetails=[];
    @track showErrorScreen=false;
    channelMap = new Map();
  //Below method will be called on load of component 
    connectedCallback(){
         this.handleSubmit();
    }
  // If you wanted to do something when user is entering the string
    handleSearch(event){
         this.searchInput = event.target.value;
         console.log('This is searchInput::'+ this.searchInput);
    }
  //To map the videoResults to iframe and related list 
    handleSubmit(){
         getVideos({searchKey:this.searchInput})
         .then ((results)=>{
            if(results !== null){
              this.videoResults = results;
              console.log('This is final video results ::'+ JSON.stringify(this.videoResults));

              if (this.videoResults.length > 0) {
                this.showErrorScreen=false;
                this.showVideoInIframe(this.videoResults[0].videoId);
                let channelObj = {};
                channelObj.subscriberCount=this.videoResults[0].subscriberCount;
                channelObj.videoCount=this.videoResults[0].videoCount;
                channelObj.viewCount=this.videoResults[0].viewCount;
                channelMap.set(this.videoResults[0].channelId,channelObj);

              }
            }
            else{
                this.showErrorScreen=true;
            }
         })
         .catch((error)=>{
              this.finalError = error.body.message;
              console.log('This is final video results ::'+ this.finalError);
         })

    }

    //To show youtube video
    showVideoInIframe(videoId){
         this.viewUrl = 'https://www.youtube.com/embed/'+videoId;
     }
     // Play video from related results
    watchVideo(event){
         let slt = event.currentTarget.dataset.id;
         console.log('This is selected video:'+ slt);
         this.viewUrl = 'https://www.youtube.com/embed/'+slt;
    }
    handleOnclickThumbnail(event){
     console.log('Onclick Thumbnail'+event.currentTarget.name);
     this.showChannelpage=true;
     getChannelDetails({ channelId :event.currentTarget.name })
     .then(result=>{
        this.channelDetails=result;
     })
     .data(error=>{
        this.finalError = error.body.message;
        console.log('This is final video results ::'+ this.finalError);
     })
    }
}