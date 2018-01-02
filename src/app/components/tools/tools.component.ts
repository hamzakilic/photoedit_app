import { AlertItem } from './../../entities/alertItem';
import { AppService } from './../../services/app.service';
import { CmdShowAlert } from './../../commands/cmdShowAlert';
import { WorkModeHand } from './../../models/photoedit/workmodes/workModeHand';


declare var $:any;
import { Component, OnInit,Input,ViewChild } from '@angular/core';

import { Workspace } from './../../models/photoedit/workSpace';
import { LayerSelect } from './../../models/photoedit/layerSelect';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/photoedit/project';

import { Layer } from '../../models/photoedit/layer';

@Component({
  selector: 'tools-component',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {


  projectService: ProjectService;
  appService:AppService;
  public project: Project;

  
  constructor(projectService: ProjectService,appService:AppService) {
    this.projectService = projectService;
    this.appService=appService;

    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
      
    
    
  }
  ngAfterViewInit(){
      
      

  }

  private selectWorking(type: number,subType:string="") {
    if (this.project)
      if (this.project.activeWorkspace) 
        this.project.activeWorkspace.selectWorking(type,subType);
      
  }

  private isWorkingMode(type: number,subType:string="") {
    if (this.project)
      if (this.project.activeWorkspace)
        return this.project.activeWorkspace.workMode.typeOf == type && this.project.activeWorkspace.workMode.subTypeOf == subType ;
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
    return { active: this.isWorkingMode(Workspace.WorkModeSelection,LayerSelect.SubTypeRect) };
  }
  selectRectangleSelection() {
    this.selectWorking(Workspace.WorkModeSelection,LayerSelect.SubTypeRect);
  }

  public get ellipseCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeSelection,LayerSelect.SubTypeEllipse) };
  }
  selectEllipseSelection() {
    this.selectWorking(Workspace.WorkModeSelection,LayerSelect.SubTypeEllipse);
  }

  public get lassoCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeSelection,LayerSelect.SubTypeLasso) };
  }
  selectLassoSelection() {    
        this.selectWorking(Workspace.WorkModeSelection,LayerSelect.SubTypeLasso);
  }

  public get colorpickerCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeColorPicker) };
  }
  selectColorPicker() {
    this.selectWorking(Workspace.WorkModeColorPicker);
  }

  public get polygonCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeSelection,LayerSelect.SubTypePolygon) };
  }
  selectPolygonSelection() {
    this.selectWorking(Workspace.WorkModeSelection,LayerSelect.SubTypePolygon);
    
    let alert=new CmdShowAlert(new AlertItem('info','for finish double click',2000),this.appService);
    alert.executeAsync();
    //this.isCollapsed=true;
  }

  public get magicwandCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeSelection,LayerSelect.SubTypeMagicWand) };
  }

 
  selectMagicWandSelection() {   
    this.selectWorking(Workspace.WorkModeSelection,LayerSelect.SubTypeMagicWand);
  } 

  public get brushCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeBrush)};
  }

 
  selectBrush() {   
    this.selectWorking(Workspace.WorkModeBrush);
    //this.isCollapsed=false;
   

  }


  public get emptyString():string{
    return " ";
  }

  public get eraseCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeErase)};
  }

 
  selectErase() {   
    this.selectWorking(Workspace.WorkModeErase);
   
  }

  public get handCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeHand)};
  }

 
  selectHand() {   
    this.selectWorking(Workspace.WorkModeHand);
   
  }

  public get bucketCss() {
    return { active: this.isWorkingMode(Workspace.WorkModeBucket)};
  }

 
  selectBucket() {   
    this.selectWorking(Workspace.WorkModeBucket);
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
