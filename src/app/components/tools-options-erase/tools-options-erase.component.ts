import { WorkModeErase, EditTypeErase } from './../../models/photoedit/workmodes/workModeErase';
import { Proj } from './../../models/photoedit/proj';
import { Workspace } from './../../models/photoedit/workSpace';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tools-options-erase-component',
  templateUrl: './tools-options-erase.component.html',
  styleUrls: ['./tools-options-erase.component.scss']
})
export class ToolsOptionsEraseComponent implements OnInit {

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

  public get eraseSize():number{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == Workspace.WorkModeBrush){
      (<EditTypeErase>(<WorkModeErase>this.project.activeWorkspace.workMode).editType).size;
    }
    return 5;
  }
  private isValid():boolean{
    return this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == Workspace.WorkModeBrush;
  }

  public changeEraseSize(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
        (<EditTypeErase>(<WorkModeErase>this.project.activeWorkspace.workMode).editType).size=val;
      }
    }
  }

  public get eraseOpacity():number{
    if(this.isValid()){
      (<EditTypeErase>(<WorkModeErase>this.project.activeWorkspace.workMode).editType).opacity*100;
    }
    return 100;
  }

  public changeEraseOpacity(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
       (<EditTypeErase>(<WorkModeErase>this.project.activeWorkspace.workMode).editType).opacity=val/100;
      }
    }
  }


  public get eraseHardness():number{
    if(this.isValid()){
      (<EditTypeErase>(<WorkModeErase>this.project.activeWorkspace.workMode).editType).hardness*100;
    }
    return 100;
  }

  public changeEraseHardness(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
       (<EditTypeErase>(<WorkModeErase>this.project.activeWorkspace.workMode).editType).hardness=val/100;
      }
    }
  }

}
