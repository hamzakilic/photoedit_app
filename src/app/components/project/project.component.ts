import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Workspace } from '../../shared/project/workSpace';
import { WorkspaceComponent } from '../workspace/workspace.component';

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

    this.project.setActiveWorkspace(ws);
  }

  removeWorkspace(ws:Workspace){

    this.project.removeWorkspace(ws);
  }


}
