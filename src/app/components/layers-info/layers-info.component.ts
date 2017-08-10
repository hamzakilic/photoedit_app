import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { Proj } from '../../models/photoedit/proj';
import { Workspace } from '../../models/photoedit/workSpace';
import { Layer } from '../../models/photoedit/layer';

@Component({
  selector: 'layersInfo-component',
  templateUrl: './layers-info.component.html',
  styleUrls: ['./layers-info.component.scss']
})
export class LayersInfoComponent implements OnInit {

   projectService: ProjectService;
  public project: Proj;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project= this.projectService.currentProject;
   }

  ngOnInit() {

  }
  removeLayer(layer: Layer){
    this.projectService.currentProject.activeWorkspace.removeLayer(layer);
  }
  disableOrEnable(layer:Layer){
   // alert(layer.name);

   layer.isHidden = !layer.isHidden;
   // this.projectService.currentProject.activeWorkspace.render();
  }

}
