import { Component, OnInit,ViewChild } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { message } from '../../lib/message';
import { messageBus } from '../../lib/messageBus';
import {callback as iskilip_core_callback } from 'iskilip/core/callback';

@Component({
  selector: 'componentSmallModal',
  templateUrl: './small-modal.component.html',
  styleUrls: ['./small-modal.component.scss']
})
export class SmallModalComponent implements OnInit {
  @ViewChild("smModal")
  public smModal:ModalDirective;

  msg: string;
  constructor() {

   }

  ngOnInit() {
    messageBus.subscribe(message.ShowError,new iskilip_core_callback((err)=>this.showError(err)));

  }
  ngAfterViewInit(){


  }

  ngOnDestroy(){

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
