import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
   }

  ngOnInit() {
    
                
  }

  public get alerts(){
    return this.appService.alerts;
  }
  

}
