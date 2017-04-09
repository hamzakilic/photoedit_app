import { Component } from '@angular/core';
import {checkBrowserCapabilities} from './lib/checkBrowserCapabilities';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  isBrowserOk: boolean;
  constructor(){
    this.isBrowserOk=checkBrowserCapabilities.isOk();
  }


}
