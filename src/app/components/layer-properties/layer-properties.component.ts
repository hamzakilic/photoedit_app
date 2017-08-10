import { Component, OnInit } from '@angular/core';

import '../../lib/extensions';
import { ProjectService } from '../../services/project.service';
import { Proj } from '../../models/photoedit/proj';
import { Layer } from '../../models/photoedit/layer';
import { LayerText } from "../../models/photoedit/layerText";
import { Callback } from '../../lib/callback';
import { Point } from '../../lib/draw/point';
import { Calc } from '../../lib/calc';
import {CalcLayer} from "../../models/photoedit/lib/calcLayer";

@Component({
  selector: 'layer-properties-component',
  templateUrl: './layer-properties.component.html',
  styleUrls: ['./layer-properties.component.scss']
})
export class LayerPropertiesComponent implements OnInit {

  projectService: ProjectService;
  public project: Proj;


  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

  changeRotateAngle(value: any, layer: Layer) {

    if (parseInt(value) <= 180 && parseInt(value) >= -180) {
      layer.rotateByDegrees(parseInt(value));

    }

  }
  changeWidth(value: any, layer: Layer) {


    if (parseInt(value) > 10) {

      layer.setWidthHeight(parseInt(value), layer.height, new Callback(() => layer.render()))
    }
  }

  changeHeight(value: any, layer: Layer) {

    if (parseInt(value) > 10) {
      layer.setWidthHeight(layer.width, parseInt(value), new Callback(() => layer.render()))
    }
  }
  changeTop(value: any, layer: Layer) {

    let val = parseInt(value);
    if(val){
    let point=CalcLayer.calculateTop(val,layer);
    layer.setLeft(point.X,new Callback(() => layer.render()));
    layer.setTop(point.Y,new Callback(() => layer.render()));
    }
}

  changeLeft(value: any, layer: Layer) {

    let val = parseInt(value);
    if(val){
    let point=CalcLayer.calculateLeft(val,layer);
    layer.setLeft(point.X,new Callback(() => layer.render()));
    layer.setTop(point.Y,new Callback(() => layer.render()));
    }
  }

  round(value: number) {
    
    return value.extRound();
  }
  isTextLayer(layer: Layer){
    return layer instanceof LayerText;
  }
  changeGlobalAlpha(value:any,layer: Layer){
    let val= parseInt(value);
    if(val){
      layer.setGlobalAlpha(val/100);
      layer.render();
    }
  }


}
