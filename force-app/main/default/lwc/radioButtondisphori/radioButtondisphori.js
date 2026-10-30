import { LightningElement } from 'lwc';
export default class MyComponentName extends LightningElement {

    options = [
        {'label': 'Ross', 'value': 'option1'},
        {'label': 'Rachel', 'value': 'option2'},
    ];

    // Select option1 by default
   value = 'option1';

    handleChange(event) {
        const selectedOption = event.detail.value;
        console.log('Option selected with value: ' + selectedOption);
    }
}