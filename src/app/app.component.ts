import { Component } from '@angular/core';
import {CheckBrowserCapabilities} from './lib/checkBrowserCapabilities';
import { KeyboardService } from './shared/keyboard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  isBrowserOk: boolean;
  constructor(keyboardService: KeyboardService){
    this.isBrowserOk=CheckBrowserCapabilities.isOk();

  }


}
