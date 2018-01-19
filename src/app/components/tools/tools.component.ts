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
import { ColorPickerComponent } from '../../modulesext/color-picker/index';
import { WorkModes } from '../../models/photoedit/iworkspace';


@Component({
  selector: 'tools-component',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @ViewChild('foregroundpicker') foregroundpicker:ColorPickerComponent;
  @ViewChild('backgroundpicker') backgroundpicker:ColorPickerComponent;
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
    return { active: this.isWorkingMode(WorkModes.WorkModeDefault) };
  }

  selectDefault() {
    this.selectWorking(WorkModes.WorkModeDefault);
  }



  public get cropCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeCrop) };
  }
  selectCrop() {
    this.selectWorking(WorkModes.WorkModeCrop);
  }


  public get rectangleCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeSelection,LayerSelect.SubTypeRect) };
  }
  selectRectangleSelection() {
    this.selectWorking(WorkModes.WorkModeSelection,LayerSelect.SubTypeRect);
  }

  public get ellipseCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeSelection,LayerSelect.SubTypeEllipse) };
  }
  selectEllipseSelection() {
    this.selectWorking(WorkModes.WorkModeSelection,LayerSelect.SubTypeEllipse);
  }

  public get lassoCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeSelection,LayerSelect.SubTypeLasso) };
  }
  selectLassoSelection() {    
        this.selectWorking(WorkModes.WorkModeSelection,LayerSelect.SubTypeLasso);
  }

  public get colorpickerCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeColorPicker) };
  }
  selectColorPicker() {
    this.selectWorking(WorkModes.WorkModeColorPicker);
  }

  public get polygonCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeSelection,LayerSelect.SubTypePolygon) };
  }
  selectPolygonSelection() {
    this.selectWorking(WorkModes.WorkModeSelection,LayerSelect.SubTypePolygon);
    
    let alert=new CmdShowAlert(new AlertItem('info','for finish double click',2000),this.appService);
    alert.executeAsync();
    //this.isCollapsed=true;
  }

  public get magicwandCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeSelection,LayerSelect.SubTypeMagicWand) };
  }

 
  selectMagicWandSelection() {   
    this.selectWorking(WorkModes.WorkModeSelection,LayerSelect.SubTypeMagicWand);
  } 

  public get brushCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeBrush)};
  }

 
  selectBrush() {   
    this.selectWorking(WorkModes.WorkModeBrush);
    //this.isCollapsed=false;
   

  }


  public get emptyString():string{
    return " ";
  }

  public get eraseCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeErase)};
  }

 
  selectErase() {   
    this.selectWorking(WorkModes.WorkModeErase);
   
  }

  public get handCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeHand)};
  }

 
  selectHand() {   
    this.selectWorking(WorkModes.WorkModeHand);
   
  }

  public get bucketCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeBucket)};
  }

 
  selectBucket() {   
    this.selectWorking(WorkModes.WorkModeBucket);
  } 

  public get gradientCss() {
    return { active: this.isWorkingMode(WorkModes.WorkModeGradient)};
  }

 
  selectGradient() {   
    this.selectWorking(WorkModes.WorkModeGradient);
   
  }


  


  
  openForegroundColorPicker(){
    
    this.foregroundpicker.openDialog(this.project.activeWorkspace.foregroundColor,true);
  }
  public get foregroundcolor(): string {
    return this.project.activeWorkspace.foregroundColor;
  }

  public setforegroundcolor(value: string) {
    
    
    this.project.activeWorkspace.foregroundColor = value;
  }

  openBackgroundColorPicker(){
    
    this.backgroundpicker.openDialog(this.project.activeWorkspace.backgroundColor,true);
  }

  public get backgroundcolor(): string {
    return this.project.activeWorkspace.backgroundColor;
  }

  public setbackgroundColor(value: string) {
    this.project.activeWorkspace.backgroundColor = value;
  }

  public swapColors() {
    let fg = this.project.activeWorkspace.foregroundColor;
    this.project.activeWorkspace.foregroundColor = this.project.activeWorkspace.backgroundColor;
    this.project.activeWorkspace.backgroundColor = fg;
  }

}
