import { LightningElement } from 'lwc';

export default class DockerComposer extends LightningElement {
    showPage;
    showDockerWindow;
    hndleopenButton(){
        //alert('here')
        this.showPage=true;
    }
}