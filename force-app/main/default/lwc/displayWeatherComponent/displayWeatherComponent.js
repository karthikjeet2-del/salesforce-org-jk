import { LightningElement,track } from 'lwc';
import weatherImage from  '@salesforce/resourceUrl/weatherImg';
export default class DisplayWeatherComponent extends LightningElement {
 weImage=weatherImage;

}