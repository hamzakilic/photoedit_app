import { LayerSelect } from './../../models/photoedit/layerSelect';
import { Proj } from './../../models/photoedit/proj';
import { ProjectService } from './../../services/project.service';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tools-options-clip-component',
  templateUrl: './tools-options-clip.component.html',
  styleUrls: ['./tools-options-clip.component.scss']
})
export class ToolsOptionsClipComponent implements OnInit {

  projectService: ProjectService;
  appService: AppService;
  public project: Proj;


  constructor(projectService: ProjectService,appService: AppService) {
    this.projectService = projectService;
    this.appService = appService;
    
    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

 private isClipModeActive(type:string):boolean{
  if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.selectionLayer){
    if(this.project.activeWorkspace.selectionLayer instanceof LayerSelect){
      
      return (<LayerSelect>this.project.activeWorkspace.selectionLayer).clipMode==type;
    }
  }
  return false;
 }

 /**
  * css için active ekler yada çıkarır
  */
  public get isClipSelfCss() {
    return { active: this.isClipModeActive(LayerSelect.ClipSelf) };
  }


 /**
  * css için active ekler yada çıkarır
  */
  public get isClipUnionCss() {
    return { active: this.isClipModeActive(LayerSelect.ClipUnion) };
  }

   /**
  * css için active ekler yada çıkarır
  */
  public get isClipIntersectCss() {
    return { active: this.isClipModeActive(LayerSelect.ClipIntersect) };
  }

   /**
  * css için active ekler yada çıkarır
  */
  public get isClipExcludeCss() {
    return { active: this.isClipModeActive(LayerSelect.ClipExclude) };
  }

   /**
  * css için active ekler yada çıkarır
  */
  public get isClipXorCss() {
    return { active: this.isClipModeActive(LayerSelect.ClipXor) };
  }


  /**
   * layer select varsa, Clipleme modunu değiştiri
   * @param type 
   */
  private makeClipMode(type:string){
  
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.selectionLayer){
      if(this.project.activeWorkspace.selectionLayer instanceof LayerSelect){
        (<LayerSelect>this.project.activeWorkspace.selectionLayer).clipMode=type;
      }
    }
  }
  

  makeSelectionSelf(){    
    this.makeClipMode(LayerSelect.ClipSelf);
  }
  makeSelectionUnion(){
    this.makeClipMode(LayerSelect.ClipUnion);

  }
  makeSelectionIntersect(){
    this.makeClipMode(LayerSelect.ClipIntersect);

  }

  makeSelectionExclude(){
    this.makeClipMode(LayerSelect.ClipExclude);

  }
  makeSelectionXor(){
    this.makeClipMode(LayerSelect.ClipXor);
  }

}
