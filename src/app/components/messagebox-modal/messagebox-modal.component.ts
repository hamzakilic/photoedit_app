import { Component, OnInit,ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Message } from '../../entities/message';
import { MessageBus } from '../../lib/messageBus';
import { Callback  } from '../../lib/callback';

@Component({
  selector: 'messageboxModal-component',
  templateUrl: './messagebox-modal.component.html',
  styleUrls: ['./messagebox-modal.component.scss']
})
export class MessageBoxModalComponent implements OnInit {
  @ViewChild("smModal")
  public smModal:ModalDirective;

  msg: string;
  private callFunc : Callback;
  constructor() {
      this.callFunc = Callback.from((err)=>this.showError(err));
   }

  ngOnInit() {
    MessageBus.subscribe(Message.ShowError,this.callFunc);

  }
  ngAfterViewInit(){


  }

  ngOnDestroy(){
    MessageBus.unsubscribe(Message.ShowError,this.callFunc);
  }
  showError(err: any): void{

    if(this.smModal.isShown)
    this.msg += err.msg;
    else{
      this.msg = err.msg;
    this.smModal.show();
    }
  }

}
