import { Component } from '@angular/core';
import { CheckBrowserCapabilities } from '../../lib/checkBrowserCapabilities';

@Component({
  selector: 'notsupportedBrowser-component',
  templateUrl: './notsupported.component.html',
  styleUrls: ['./notsupported.component.scss']
})
export class NotSupportedBrowserComponent {
  title = 'app not works!';
  msg():string{
    return CheckBrowserCapabilities.errMsg;
  }
}
