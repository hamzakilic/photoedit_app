import { Component } from '@angular/core';
import { CheckBrowserCapabilities } from './lib/checkBrowserCapabilities';
import { KeyboardService } from './services/keyboard.service';
import { AppService } from './services/app.service';
import { MessageBus } from './lib/messageBus';
import { Message } from './entities/message';
import { Callback } from './lib/callback';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  isBrowserOk: boolean;
  constructor(keyboardService: KeyboardService,appService: AppService) {
    this.isBrowserOk = CheckBrowserCapabilities.isOk();
    
  }
  


}
