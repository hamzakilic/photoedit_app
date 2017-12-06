import { CmdExecuteImageAlgorithms } from './commands/cmdExecuteImageAlgorithms';
import { Component, AfterViewInit } from '@angular/core';
import { CheckBrowserCapabilities } from './lib/checkBrowserCapabilities';
import { KeyboardService } from './services/keyboard.service';
import { AppService } from './services/app.service';
import { MessageBus } from './lib/messageBus';
import { Message } from './entities/message';
import { Callback } from './lib/callback';
import { CmdShowFormSampleImages} from './commands/cmdShowFormSampleImages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'app works!';
  isBrowserOk: boolean;
  private _appservice:AppService;
  constructor(keyboardService: KeyboardService,appService: AppService) {
    this.isBrowserOk = CheckBrowserCapabilities.isOk();
    this._appservice=appService;
    /* window.addEventListener('beforeunload',(e)=>{
      let msg="Ayrılmak İstediğinize eminmisiniz";
      e.returnValue=msg;
      return msg;
    }) */
   
  }

  ngOninit(){
      
  }
  ngAfterViewInit(){
    let cmd=new CmdShowFormSampleImages(true);
    cmd.executeAsync();
  }
    
  


}
