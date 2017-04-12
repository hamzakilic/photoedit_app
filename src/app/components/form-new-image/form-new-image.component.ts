import { Component, OnInit,ViewChild } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { message } from '../../lib/message';
import { messageBus } from '../../lib/messageBus';
import { callback as iskilip_callback } from 'iskilip/core/callback';

@Component({
  selector: 'formNewImage',
  templateUrl: './form-new-image.component.html',
  styleUrls: ['./form-new-image.component.scss']
})
export class FormNewImageComponent implements OnInit {
  @ViewChild("smModal")
  public smModal:ModalDirective;

  private callFunc: iskilip_callback;
  constructor() {
    this.callFunc = new iskilip_callback(this.show);
   }

  ngOnInit() {
    messageBus.subscribe(message.ShowFormNewImage,this.callFunc);
  }
  ngOnDestroy(){
    messageBus.unsubscribe(message.ShowFormNewImage,this.callFunc);
  }

  show(): void{

    if(!this.smModal.isShown){
       this.smModal.show();
    }
  }

}
