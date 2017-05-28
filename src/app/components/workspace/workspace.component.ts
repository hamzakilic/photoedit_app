import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';
import { SurfaceComponent } from '../surface/surface.component';
import { Workspace } from '../../shared/project/workSpace';

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




  onSelected(workspace: Workspace){
    alert(workspace.name);
  }


  /*mouseWheelUpFunc() {
    if(this.keyboardService.IsCtrlPressed)
     {}

  }

  mouseWheelDownFunc() {
    if(this.keyboardService.IsCtrlPressed)
      {}


  }*/



}

