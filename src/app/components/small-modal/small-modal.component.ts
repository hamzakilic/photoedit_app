import { Component, OnInit,ViewChild } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { message } from '../../lib/message';
import { messageBus } from '../../lib/messageBus';
import { callback as iskilip_callback } from 'iskilip/core/callback';

@Component({
  selector: 'smallModal',
  templateUrl: './small-modal.component.html',
  styleUrls: ['./small-modal.component.scss']
})
export class SmallModalComponent implements OnInit {
  @ViewChild("smModal")
  public smModal:ModalDirective;

  msg: string;
  private callFunc : iskilip_callback;
  constructor() {
      this.callFunc = new iskilip_callback((err)=>this.showError(err));
   }

  ngOnInit() {
    messageBus.subscribe(message.ShowError,this.callFunc);

  }
  ngAfterViewInit(){


  }

  ngOnDestroy(){
    messageBus.unsubscribe(message.ShowError,this.callFunc);
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
