import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { AppService } from '../../app.service';
import { Proj } from '../../shared/project/proj';
import { Layer } from '../../shared/project/layer';
import { LayerPropertiesComponent } from '../layer-properties/layer-properties.component';
import { MessageBus } from '../../lib/messageBus';
import { Message } from '../../lib/message';
import { Callback } from '../../lib/callback';
import { CmdCrop } from '../../shared/commands/cmdCrop';

@Component({
  selector: 'selection-properties-component',
  templateUrl: './selection-properties.component.html',
  styleUrls: ['./selection-properties.component.scss']
})
export class SelectionPropertiesComponent implements OnInit {

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


  changeWidth(value: number) {
    if (value > 10) {
      this.project.activeWorkspace.selectionRectangleLayer.setWidthHeight(value, this.project.activeWorkspace.selectionRectangleLayer.height)
    }
  }

  changeHeight(value: number) {
    if (value > 10) {
      this.project.activeWorkspace.selectionRectangleLayer.setWidthHeight(this.project.activeWorkspace.selectionRectangleLayer.width, value)
    }
  }
  changeTop(value: number) {

    this.project.activeWorkspace.selectionRectangleLayer.marginTop = value;

  }
  changeLeft(value: number) {

    this.project.activeWorkspace.selectionRectangleLayer.marginLeft = value;

  }
  cropOk(){
    let cmdCrop = new CmdCrop(this.projectService,this.appService);
    cmdCrop.executeAsync();

  }
  cropCancel(){
    this.project.activeWorkspace.removeSelectionRectangleLayer();
  }


  


}
