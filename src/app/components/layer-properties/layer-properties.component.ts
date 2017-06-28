import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Layer } from '../../shared/project/layer';
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

  changeRotateAngle(value: number, layer: Layer) {

    if (value <= 180 && value >= -180) {
      layer.rotateByDegrees(value);

    }

  }
  changeWidth(value: number, layer: Layer) {
    if (value > 10) {
      layer.setWidthHeight(value, layer.height)
    }
  }

  changeHeight(value: number, layer: Layer) {
    if (value > 10) {
      layer.setWidthHeight(layer.width, value)
    }
  }
  changeTop(value: number, layer: Layer) {

    layer.marginTop = value;

  }
  changeLeft(value: number, layer: Layer) {

    layer.marginLeft = value;

  }


}
