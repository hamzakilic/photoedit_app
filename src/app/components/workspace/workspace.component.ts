import { Component, OnInit, ViewChild } from '@angular/core';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { WorkSpace } from '../../shared/project/workSpace';
import { CanvasComponent } from '../canvas-target/canvas.component';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  projectService: ProjectService;
  @ViewChild('canvas')
   public Canvas: CanvasComponent;
  constructor(projectService: ProjectService) {
    this.projectService = projectService;
   }


  ngOnInit() {

  }
  onSelected(workspace: WorkSpace){
    alert(workspace.Name);
  }



}
