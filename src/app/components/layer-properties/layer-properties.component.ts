import { Component, OnInit } from '@angular/core';

import '../../lib/extensions';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/photoedit/project';
import { Layer } from '../../models/photoedit/layer';
import { LayerText } from "../../models/photoedit/layerText";
import { LayerGraphics } from "../../models/photoedit/layerGraphics";
import { Callback } from '../../lib/callback';
import { Point } from '../../lib/draw/point';
import { HMath } from '../../lib/hMath';
import {CalcLayer} from "../../models/photoedit/lib/calcLayer";
import { AutoCompleteItem } from "../../entities/autocompleteItem";

@Component({
  selector: 'layer-properties-component',
  templateUrl: './layer-properties.component.html',
  styleUrls: ['./layer-properties.component.scss']
})
export class LayerPropertiesComponent implements OnInit {

  projectService: ProjectService;
  public project: Project;
  public accordionClass: string = 'accordionClass';
  

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

  changeRotateAngle(value: any, layer: Layer) {

    let val=parseInt(value);
    if (!isNaN(val) &&
       val <= 180 && val >= -180) {
      layer.rotateByDegrees(parseInt(value));

    }

  }
  changeWidth(value: any, layer: Layer) {

    let val=parseInt(value);
    if (!isNaN(val) && val > 10) {

      layer.setWidthHeight(parseInt(value), layer.height, new Callback(() => layer.render()))
    }
  }

  changeHeight(value: any, layer: Layer) {
    let val=parseInt(value);
    if (!isNaN(val) && val > 10) {
      layer.setWidthHeight(layer.width, parseInt(value), new Callback(() => layer.render()))
    }
  }
  changeTop(value: any, layer: Layer) {

    let val = parseInt(value);
    if(!isNaN(val)){
    let point=CalcLayer.calculateTop(val,layer);
    layer.setLeft(point.x.extFloor(),new Callback(() => layer.render()));
    layer.setTop(point.y.extFloor(),new Callback(() => layer.render()));
    }
}

  changeLeft(value: any, layer: Layer) {
    
    let val = parseInt(value);
    if(!isNaN(val)){
    let point=CalcLayer.calculateLeft(val,layer);
    layer.setLeft(point.x.extFloor(),new Callback(() => layer.render()));
    layer.setTop(point.y.extFloor(),new Callback(() => layer.render()));
    }
  }

  round(value: number) {
    
    return value.extRound();
  }
  isTextLayer(layer: Layer){
    
    return layer instanceof LayerText;
  }
   isGraphicsLayer(layer: Layer){
    return layer instanceof LayerGraphics;
  }
  changeGlobalAlpha(value:any,layer: Layer){
    let val= parseInt(value);
    if(!isNaN(val)){
      layer.globalAlpha=(val/100);
      layer.render();
    }
  }

  public get blendModes():Array<string>{
    
    return ["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light",
    "soft-light","difference","exclusion","hue","saturation","color","luminosity"].sort((a,b)=>a.localeCompare(b));
  }
  public changeLayerBlendMode(event:AutoCompleteItem,layer:Layer){
    layer.blendMode=event.id;
  }

  public blendmodeRefreshValue(event:AutoCompleteItem,layer:Layer){
    
    layer.blendMode=(event.id);
  }
  

  
  public getLayerBlendMode(layer:Layer):Array<AutoCompleteItem>{
    
     let modes=[];
   
    modes.push({id:layer.blendMode,text:layer.blendMode});
    return modes;
  }



  public get hasSelectedLayer():boolean{
    if(this.project && this.project.activeWorkspace)
     {
       return this.project.activeWorkspace.layers.findIndex((item)=>item.isSelected===true)>-1;
     }
     return false;
     
  }

  public get selectedLayer():Layer{
    if(this.project && this.project.activeWorkspace)
     {
       return this.project.activeWorkspace.layers.find((item)=>item.isSelected===true);
     }
     return undefined;
     
  }
}