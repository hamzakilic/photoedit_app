import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { Proj } from '../../models/photoedit/proj';
import { Workspace } from '../../models/photoedit/workSpace';
import { Layer } from '../../models/photoedit/layer';

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

    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

  private selectWorking(mode: number) {
    if (this.project)
      if (this.project.activeWorkspace) 
        this.project.activeWorkspace.selectWorking(mode);
      
  }

  private isWorkingMode(mode: number) {
    if (this.project)
      if (this.project.activeWorkspace)
        return this.project.activeWorkspace.workMode.typeOf == mode;
  }

  public get defaultCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeDefault) };
  }

  selectDefault() {
    this.selectWorking(Workspace.WorkModeDefault);
  }



  public get cropCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeCrop) };
  }
  selectCrop() {
    this.selectWorking(Workspace.WorkModeCrop);
  }


  public get rectangleCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeRectangleSelection) };
  }
  selectRectangleSelection() {
    this.selectWorking(Workspace.WorkModeRectangleSelection);
  }

  public get ellipseCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeEllipseSelection) };
  }
  selectEllipseSelection() {
    this.selectWorking(Workspace.WorkModeEllipseSelection);
  }

  public get lassoCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeLassoSelection) };
  }
  selectLassoSelection() {    
        this.selectWorking(Workspace.WorkModeLassoSelection);
  }

  public get colorpickerCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeColorPicker) };
  }
  selectColorPicker() {
    this.selectWorking(Workspace.WorkModeColorPicker);
  }

  public get polygonCss() {
    return { active: this.isWorkingMode(Workspace.WorkModePolygonalSelection) };
  }
  selectPolygonSelection() {
    this.selectWorking(Workspace.WorkModePolygonalSelection);
  }








 

 


 

  

  




  public get foregroundcolor(): string {
    return this.project.activeWorkspace.foregroundColor;
  }

  public set foregroundcolor(value: string) {
    this.project.activeWorkspace.foregroundColor = value;
  }



  public get backgroundcolor(): string {
    return this.project.activeWorkspace.backgroundColor;
  }

  public set backgroundcolor(value: string) {
    this.project.activeWorkspace.backgroundColor = value;
  }

  public swapColors() {
    let fg = this.project.activeWorkspace.foregroundColor;
    this.project.activeWorkspace.foregroundColor = this.project.activeWorkspace.backgroundColor;
    this.project.activeWorkspace.backgroundColor = fg;
  }

}
