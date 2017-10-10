import { WorkModeBrush } from './../../models/photoedit/workmodes/workModeBrush';
import { AutoCompleteItem } from './../../entities/autocompleteItem';
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

  public get brushSize():number{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == Workspace.WorkModeBrush){
      (<WorkModeBrush>this.project.activeWorkspace.workMode).brush.size;
    }
    return 5;
  }
  private isValid():boolean{
    return this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == Workspace.WorkModeBrush;
  }

  public changeBrushSize(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
        (<WorkModeBrush>this.project.activeWorkspace.workMode).brush.size=val;
      }
    }
  }

  public get brushOpacity():number{
    if(this.isValid()){
      (<WorkModeBrush>this.project.activeWorkspace.workMode).brush.opacity*100;
    }
    return 100;
  }

  public changeBrushOpacity(value:string){
    let val= Number.parseInt(value);
    if(val){
      if(this.isValid()){
        (<WorkModeBrush>this.project.activeWorkspace.workMode).brush.opacity=val/100;
      }
    }
  }



  public get blendModes():Array<string>{
    
    return ["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light",
    "soft-light","difference","exclusion","hue","saturation","color","luminosity"].sort((a,b)=>a.localeCompare(b));
  }
  public changeBrushBlendMode(event:AutoCompleteItem){
    
    if(this.isValid()){
      (<WorkModeBrush>this.project.activeWorkspace.workMode).brush.blendMode=event.id;
    }
  }

  public getBrushBlendMode():Array<AutoCompleteItem>{
    
     let modes=[];
    if(this.isValid()){
      let val=(<WorkModeBrush>this.project.activeWorkspace.workMode).brush.blendMode;
      modes.push({id:val,text:val});
    }else{
      modes.push({id:"normal",text:"normal"});
    }
    return modes;
  }

 
}
