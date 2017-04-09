import { Component } from '@angular/core';
import { checkBrowserCapabilities } from '../lib/checkBrowserCapabilities';

@Component({
  selector: 'notsupportedBrowser',
  templateUrl: './notsupported.component.html',
  styleUrls: ['./notsupported.component.scss']
})
export class NotSupportedBrowserComponent {
  title = 'app not works!';
  msg():string{
    return checkBrowserCapabilities.errMsg;
  }
}
