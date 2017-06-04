import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Workspace } from '../../shared/project/workSpace';
import { Layer } from '../../shared/project/layer';

@Component({
  selector: 'tools-component',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  projectService: ProjectService;
  public project: Proj;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project= this.projectService.currentProject;
   }

  ngOnInit() {
  }

  selectHand(){
    if(this.project)
    if(this.project.activeWorkspace)
      this.project.activeWorkspace.selectWorking(Workspace.WorkModeHand);

  }
  selectSelection(){
     if(this.project)
    if(this.project.activeWorkspace)
      this.project.activeWorkspace.selectWorking(Workspace.WorkModeSelection);

  }
  selectText(){

  }
  selectShapeRect(){

  }

  selectCrop(){

  }

}
