


import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Proj } from '../../models/photoedit/proj';
import { Workspace } from '../../models/photoedit/workSpace';
import { WorkspaceComponent } from '../workspace/workspace.component';
import  '../../lib/extensions';


@Component({
  selector: 'project-component',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']

})
export class ProjectComponent implements OnInit {
  projectService: ProjectService;
  public project: Proj;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project= this.projectService.currentProject;
   }


  ngOnInit() {


  }
  selectWorkspace(ws:Workspace){

    this.project.activeWorkspace=(ws);
  }

  removeWorkspace(ws:Workspace){

    this.project.removeWorkspace(ws);
  }
  name(ws: Workspace){
    
    
    return ws.name+"("+ws.width.extRound()+"x"+ws.height.extRound()+")";
  }


}
