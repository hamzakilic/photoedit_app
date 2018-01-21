import { WorkModeShape } from './../../models/photoedit/workmodes/workModeShape';
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
    return { active: this.isWorkingMode(WorkModes.Default) };
  }

  selectDefault() {
    this.selectWorking(WorkModes.Default);
  }



  public get cropCss() {
    return { active: this.isWorkingMode(WorkModes.Crop) };
  }
  selectCrop() {
    this.selectWorking(WorkModes.Crop);
  }


  public get rectangleCss() {
    return { active: this.isWorkingMode(WorkModes.Selection,LayerSelect.SubTypeRect) };
  }
  selectRectangleSelection() {
    this.selectWorking(WorkModes.Selection,LayerSelect.SubTypeRect);
  }

  public get ellipseCss() {
    return { active: this.isWorkingMode(WorkModes.Selection,LayerSelect.SubTypeEllipse) };
  }
  selectEllipseSelection() {
    this.selectWorking(WorkModes.Selection,LayerSelect.SubTypeEllipse);
  }

  public get lassoCss() {
    return { active: this.isWorkingMode(WorkModes.Selection,LayerSelect.SubTypeLasso) };
  }
  selectLassoSelection() {    
        this.selectWorking(WorkModes.Selection,LayerSelect.SubTypeLasso);
  }

  public get colorpickerCss() {
    return { active: this.isWorkingMode(WorkModes.ColorPicker) };
  }
  selectColorPicker() {
    this.selectWorking(WorkModes.ColorPicker);
  }

  public get polygonCss() {
    return { active: this.isWorkingMode(WorkModes.Selection,LayerSelect.SubTypePolygon) };
  }
  selectPolygonSelection() {
    this.selectWorking(WorkModes.Selection,LayerSelect.SubTypePolygon);
    
    let alert=new CmdShowAlert(new AlertItem('info','for finish double click',2000),this.appService);
    alert.executeAsync();
    //this.isCollapsed=true;
  }

  public get magicwandCss() {
    return { active: this.isWorkingMode(WorkModes.Selection,LayerSelect.SubTypeMagicWand) };
  }

 
  selectMagicWandSelection() {   
    this.selectWorking(WorkModes.Selection,LayerSelect.SubTypeMagicWand);
  } 

  public get brushCss() {
    return { active: this.isWorkingMode(WorkModes.Brush)};
  }

 
  selectBrush() {   
    this.selectWorking(WorkModes.Brush);
    //this.isCollapsed=false;
   

  }


  public get emptyString():string{
    return " ";
  }

  public get eraseCss() {
    return { active: this.isWorkingMode(WorkModes.Erase)};
  }

 
  selectErase() {   
    this.selectWorking(WorkModes.Erase);
   
  }

  public get handCss() {
    return { active: this.isWorkingMode(WorkModes.Hand)};
  }

 
  selectHand() {   
    this.selectWorking(WorkModes.Hand);
   
  }

  public get bucketCss() {
    return { active: this.isWorkingMode(WorkModes.Bucket)};
  }

 
  selectBucket() {   
    this.selectWorking(WorkModes.Bucket);
  } 

  public get gradientCss() {
    return { active: this.isWorkingMode(WorkModes.Gradient)};
  }

 
  selectGradient() {   
    this.selectWorking(WorkModes.Gradient);
   
  }


  public get shapeCss() {
    return { active: this.isWorkingMode(WorkModes.Shapes)};
  }

 
  selectShape() {   
    this.selectWorking(WorkModes.Shapes);
   
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
