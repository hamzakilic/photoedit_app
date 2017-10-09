import { Proj } from './../../models/photoedit/proj';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tool-options-component',
  templateUrl: './tools-options.component.html',
  styleUrls: ['./tools-options.component.scss']
})
export class ToolsOptionsComponent implements OnInit {

  projectService: ProjectService;
  appService: AppService;
  project: Proj;


  constructor(projectService: ProjectService,appService: AppService) {
    this.projectService = projectService;
    this.appService = appService;    
    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

  get isSelectionTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.selectionLayer)
     return true;
    return false;
  }

}
