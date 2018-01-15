import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {Http} from '@angular/http';
import { AppService } from "../../services/app.service";
import { CgBusyDefaults } from 'angular-busy2';

@Component({
  selector: 'busy-component',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {

  @ViewChild('customTemplate')
  private customTemplateTpl: TemplateRef<any>;
 private appService: AppService;
  constructor(private busyDefaults: CgBusyDefaults,appService: AppService) {
    this.busyDefaults.backdrop=true;
    this.busyDefaults.message="Busy";    
    
    this.appService = appService;
   }

  ngOnInit() {
    
    
            
  }
  public get loading():Promise<any>{
    return this.appService.busy;
  }

}
