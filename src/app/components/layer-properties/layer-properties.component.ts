import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Layer } from '../../shared/project/layer';
import { Callback } from '../../lib/callback';
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

    
    if (parseInt(value) > 10 ) {
    
      layer.setWidthHeight(parseInt(value), layer.height, new Callback(() => layer.render()))
    }
  }

  changeHeight(value: any, layer: Layer) {
    
    if (parseInt(value) > 10) {
      layer.setWidthHeight(layer.width,parseInt(value), new Callback(() => layer.render()))
    }
  }
  changeTop(value: any, layer: Layer) {
   
    layer.setTop(parseInt(value), new Callback(() => layer.render()));


  }
  changeLeft(value: any, layer: Layer) {
   
    layer.setLeft(parseInt(value), new Callback(() => layer.render()));

  }


}
