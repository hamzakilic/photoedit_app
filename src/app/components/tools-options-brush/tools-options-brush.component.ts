import { Workspace } from './../../models/photoedit/workSpace';
import { Proj } from './../../models/photoedit/proj';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tools-options-brush-component',
  templateUrl: './tools-options-brush.component.html',
  styleUrls: ['./tools-options-brush.component.scss']
})
export class ToolsOptionsBrushComponent implements OnInit {

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

 
}
