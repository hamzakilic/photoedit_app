import { EditTypeBucket, WorkModeBucket } from './../../models/photoedit/workmodes/workModeBucket';
import { EditTypeBrush, WorkModeBrush } from './../../models/photoedit/workmodes/workModeBrush';
import { Workspace } from './../../models/photoedit/workSpace';
import { Project } from './../../models/photoedit/project';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { AutoCompleteItem } from './../../entities/autocompleteItem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tools-options-bucketfill-component',
  templateUrl: './tools-options-bucketfill.component.html',
  styleUrls: ['./tools-options-bucketfill.component.scss']
})
export class ToolsOptionsBucketfillComponent implements OnInit {

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

  private isValid():boolean{
    return this.project && this.project.activeWorkspace && this.project.activeWorkspace.workMode.typeOf == Workspace.WorkModeBucket;
  }


  public get blendModes():Array<string>{
    
    return ["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light",
    "soft-light","difference","exclusion","hue","saturation","color","luminosity"].sort((a,b)=>a.localeCompare(b));
  }
  public changeBucketBlendMode(event:AutoCompleteItem){
    
    if(this.isValid()){
      (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).blendMode=event.id;
    }
  }

  public getBucketBlendMode():Array<AutoCompleteItem>{
    
     let modes=[];
    if(this.isValid()){
      let val=(<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).blendMode;
      modes.push({id:val,text:val});
    }else{
      modes.push({id:"normal",text:"normal"});
    }
    return modes;
  }

  

  public get fillType():string{
    if(this.isValid())
      return (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).fillType;
      return "fg";

  }
  public set fillType(val:string){
    if(this.isValid())
      (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).fillType=val;
      

  }


  public get selectType():string{
    if(this.isValid())
      return (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).selectType;
      return "selection";

  }
  public set selectType(val:string){
    if(this.isValid())
      (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).selectType=val;
      

  }

  public get threshold():string{
    if(this.isValid())
      return (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).threshold.toString();
      return "2";

  }
  public set threshold(val:string){
    let valInt=Number.parseInt(val);
    if(this.isValid() && valInt != Number.NaN)
      (<EditTypeBucket>(<WorkModeBucket>this.project.activeWorkspace.workMode).editType).threshold=valInt;
      

  }



}
