import { WorkModeBucket } from './../../models/photoedit/workmodes/workModeBucket';
import { Workspace } from './../../models/photoedit/workSpace';
import { Project } from './../../models/photoedit/project';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { WorkModes } from '../../models/photoedit/iworkspace';

@Component({
  selector: 'tool-options-component',
  templateUrl: './tools-options.component.html',
  styleUrls: ['./tools-options.component.scss']
})
export class ToolsOptionsComponent implements OnInit {

  projectService: ProjectService;
  appService: AppService;
  project: Project;


  constructor(projectService: ProjectService,appService: AppService) {
    this.projectService = projectService;
    this.appService = appService;    
    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

  get isSelectionTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.selectionLayer && this.project.activeWorkspace.workMode.typeOf == WorkModes.Selection )
     return true;
    return false;
  }

  get isBrushTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == WorkModes.Brush )
     return true;
    return false;
  }

  get isEraseTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == WorkModes.Erase )
     return true;
    return false;
  }

  get isBucketTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == WorkModes.Bucket )
     return true;
    return false;
  }

  get isGradientTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == WorkModes.Gradient )
     return true;
    return false;
  }
  get isShapeTool():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == WorkModes.Shapes )
     return true;
    return false;
  }


}
