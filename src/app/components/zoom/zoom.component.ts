import { TrackbarComponent } from './../trackbar/trackbar.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Workspace } from '../../models/photoedit/workSpace';
import { Project } from '../../models/photoedit/project';
import { ProjectService } from '../../services/project.service';
import { Callback } from '../../lib/callback';

@Component({
  selector: 'zoom-component',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
  projectService: ProjectService;
  public project: Project;
  
  @ViewChild('tracker') tracker: TrackbarComponent;
  
 

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.project = this.projectService.currentProject;
  

  }


  ngOnInit() {
  
   
  }

  ngDoCheck(){
    
    if(this.tracker && this.tracker.value != this.value){
      this.tracker.changeValue(this.value);
    }
  }
  
  public get value():number{
    if(this.project && this.project.activeWorkspace){
      let val= (this.project.activeWorkspace.zoom*100).extRound();
      
      return val;
    }
    return 100;
  }

  valueChanged(value:number) {
    
   
    if(this.project && this.project.activeWorkspace)
      this.project.activeWorkspace.zoomTo(value/100);   
    
  }
  currentZoom():string{
    if(this.project && this.project.activeWorkspace){
      let val= (this.project.activeWorkspace.zoom*100).extRound()+"%";
      
      return val;
    }
    return "0";
  }
  biggerThan() {
    if(this.project && this.project.activeWorkspace){
      let val= (this.project.activeWorkspace.zoom*100).extRound();
      
      return val>=500;
    }
    return false;

  }
   
  

   


  

}
