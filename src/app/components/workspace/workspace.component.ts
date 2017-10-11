import { Component, OnInit, ViewChild, Input, AfterViewInit,ElementRef } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { ProjectService } from '../../services/project.service';
import { KeyboardService } from '../../services/keyboard.service';
import { SurfaceComponent } from '../surface/surface.component';
import { Workspace } from '../../models/photoedit/workSpace';

import { HImage } from '../../lib/image' ;
import { Callback } from '../../lib/callback';

@Component({
  selector: 'workspace-component',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
  private projectService: ProjectService;
  private keyboardService: KeyboardService;

  


  @Input()
  workspace:Workspace;


  constructor(projectService: ProjectService, keyboardService: KeyboardService) {

    this.projectService = projectService;
    this.keyboardService = keyboardService;
    

   }


  ngOnInit() {
    
    

  }
  ngOnDestroy(){


  }
  ngAfterViewInit(){

  }




  onSelected(workspace: Workspace){

  }







}

