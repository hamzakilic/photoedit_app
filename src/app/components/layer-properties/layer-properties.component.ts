import { Component, OnInit } from '@angular/core';

import '../../lib/extensions';
import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Layer } from '../../shared/project/layer';
import { LayerText } from "../../shared/project/layerText";
import { Callback } from '../../lib/callback';
import { Point } from '../../lib/draw/point';
import { Calc } from '../../lib/calc';
import {CalcLayer} from "../../shared/project/lib/calcLayer";

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
    let point=CalcLayer.calculateTop(val,layer);
    layer.setLeft(point.X,new Callback(() => layer.render()));
    layer.setTop(point.Y,new Callback(() => layer.render()));
}

  changeLeft(value: any, layer: Layer) {

    let val = parseInt(value);
    let point=CalcLayer.calculateLeft(val,layer);
    layer.setLeft(point.X,new Callback(() => layer.render()));
    layer.setTop(point.Y,new Callback(() => layer.render()));
  }

  round(value: number) {
    return value.extRound();
  }
  isTextLayer(layer: Layer){
    return layer instanceof LayerText;
  }


}
