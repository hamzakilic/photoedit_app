import { Component, OnInit } from '@angular/core';
import { message } from '../../lib/message';
import { messageBus } from '../../lib/messageBus';
import {callback as iskilip_core_callback } from 'iskilip/core/callback';

@Component({
  selector: 'component-small-modal',
  templateUrl: './small-modal.component.html',
  styleUrls: ['./small-modal.component.scss']
})
export class SmallModalComponent implements OnInit {
  msg: string;
  constructor() {

   }

  ngOnInit() {
    messageBus.subscribe(message.ShowError,new iskilip_core_callback(this.showError));

  }
  ngAfterViewInit(){


  }

  ngOnDestroy(){

  }
  showError(msg: any): void{
    alert(msg);
  }

}
