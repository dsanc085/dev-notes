import { Component } from '@angular/core';

@Component({
    selector: 'app-my-settings',
    templateUrl: './my-settings.component.html',
    styleUrls: ['./my-settings.component.scss']
})
export class MySettingsComponent {
    public clickedReset(): void {
        console.log("Clicked Reset Button");
    }

    public clickedSave(): void {
        console.log("Clicked Save Button");
    }

    public clickedHelp(): void {
        console.log("Clicked Help Button");
    }
}
