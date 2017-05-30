import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Workspace } from '../../shared/project/workSpace';

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

}
