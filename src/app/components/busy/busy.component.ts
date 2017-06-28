import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { AppService } from "../../app.service";

@Component({
  selector: 'busy-component',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {

  appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
   }

  ngOnInit() {
    
    
            
  }

}
