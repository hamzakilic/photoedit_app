import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Layer } from '../../shared/project/layer';
import { LayerPropertiesComponent } from '../layer-properties/layer-properties.component';

@Component({
  selector: 'crop-properties-component',
  templateUrl: './crop-properties.component.html',
  styleUrls: ['./crop-properties.component.scss']
})
export class CropPropertiesComponent implements OnInit {

  projectService: ProjectService;
  public project: Proj;


  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }


  changeWidth(value: number) {
    if (value > 10) {
      this.project.activeWorkspace.cropLayer.setWidthHeight(value, this.project.activeWorkspace.cropLayer.height)
    }
  }

  changeHeight(value: number) {
    if (value > 10) {
      this.project.activeWorkspace.cropLayer.setWidthHeight(this.project.activeWorkspace.cropLayer.width, value)
    }
  }
  changeTop(value: number) {

    this.project.activeWorkspace.cropLayer.marginTop = value;

  }
  changeLeft(value: number) {

    this.project.activeWorkspace.cropLayer.marginLeft = value;

  }
  cropOk(){
    alert("ok");

  }
  cropCancel(){
    this.project.activeWorkspace.removeCropLayer();
  }


  


}
