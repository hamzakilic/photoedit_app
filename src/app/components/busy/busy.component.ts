import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { AppService } from "../../services/app.service";
import { IBusyConfig } from 'angular2-busy';

@Component({
  selector: 'busy-component',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {

 private appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
   }

  ngOnInit() {
    
    this.appService.busyPromise
            
  }
  public get loading():IBusyConfig{
    return this.appService.busyPromise;
  }

}
