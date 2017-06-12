import { Component, OnInit } from '@angular/core';
import { ProjectService} from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';

@Component({
  selector: 'layer-properties',
  templateUrl: './layer-properties.component.html',
  styleUrls: ['./layer-properties.component.scss']
})
export class LayerPropertiesComponent implements OnInit {

   projectService: ProjectService;
  public project: Proj;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project= this.projectService.currentProject;
   }

  ngOnInit() {
  }

}
