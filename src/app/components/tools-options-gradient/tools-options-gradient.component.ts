import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Gradient } from '../../lib/draw/gradient';

@Component({
  selector: 'tools-options-gradient-component',
  templateUrl: './tools-options-gradient.component.html',
  styleUrls: ['./tools-options-gradient.component.scss']
})
export class ToolsOptionsGradientComponent implements OnInit {

  constructor(public projectService: ProjectService) { }

  ngOnInit() {
    
  }

  modelChangedHandler(model){

   // debugger;
    this.projectService.currentProject.activeWorkspace.gradient=model;
  }

}
