import { WorkModeBrush, EditTypeBrush } from './../../models/photoedit/workmodes/workModeBrush';
import { AutoCompleteItem } from './../../entities/autocompleteItem';
import { Workspace } from './../../models/photoedit/workSpace';
import { Project } from './../../models/photoedit/project';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { WorkModes } from '../../models/photoedit/iworkspace';

@Component({
  selector: 'tools-options-brush-component',
  templateUrl: './tools-options-brush.component.html',
  styleUrls: ['./tools-options-brush.component.scss']
})
export class ToolsOptionsBrushComponent implements OnInit {

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

  public get brushSize():number{
    if(this.isValid())
      return (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).size;
    
    return 5;
  }
  private isValid():boolean{
    return this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == WorkModes.Brush;
  }

  public changeBrushSize(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
        (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).size=val;
      }
    }
  }

  public get brushOpacity():number{
    if(this.isValid()){
      return (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).opacity*100;
    }
    return 100;
  }

  public changeBrushOpacity(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
       (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).opacity=val/100;
      }
    }
  }


  public get brushHardness():number{
    if(this.isValid()){
      return (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).hardness*100;
    }
    return 100;
  }

  public changeBrushHardness(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
       (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).hardness=val/100;
      }
    }
  }



  public get blendModes():Array<string>{
    
    return ["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light",
    "soft-light","difference","exclusion","hue","saturation","color","luminosity"].sort((a,b)=>a.localeCompare(b));
  }
  public changeBrushBlendMode(event:AutoCompleteItem){
    
    if(this.isValid()){
      (<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).blendMode=event.id;
    }
  }

  public getBrushBlendMode():Array<AutoCompleteItem>{
    
     let modes=[];
    if(this.isValid()){
      let val=(<EditTypeBrush>(<WorkModeBrush>this.project.activeWorkspace.workMode).editType).blendMode;
      modes.push({id:val,text:val});
    }else{
      modes.push({id:"normal",text:"normal"});
    }
    return modes;
  }

 
}
