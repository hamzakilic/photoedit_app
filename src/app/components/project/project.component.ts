import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/project.service';
import { proj } from '../../shared/project/proj';
import { WorkspaceComponent } from '../workspace/workspace.component';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']

})
export class ProjectComponent implements OnInit {
  projectService: ProjectService;
  public project: proj;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project= this.projectService.currentProject;
   }


  ngOnInit() {


  }

}
