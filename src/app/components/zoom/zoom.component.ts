import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Workspace } from '../../models/photoedit/workSpace';
import { Proj } from '../../models/photoedit/proj';
import { ProjectService } from '../../services/project.service';
import { Callback } from '../../lib/callback';

@Component({
  selector: 'zoom-component',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
  projectService: ProjectService;
  public project: Proj;
  
  
  
 

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.project = this.projectService.currentProject;
  

  }


  ngOnInit() {


  }
  

  valueChanged(value:number) {
    
   
    if(this.project && this.project.activeWorkspace)
      this.project.activeWorkspace.zoomTo(value/100);   
    
  }
  currentZoom():number{
    if(this.project && this.project.activeWorkspace){
      return (this.project.activeWorkspace.zoom*100).extRound();
    }
    return 0;
  }
   
  

   


  

}
