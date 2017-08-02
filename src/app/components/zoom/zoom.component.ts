import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Workspace } from '../../shared/project/workSpace';
import { Proj } from '../../shared/project/proj';
import { ProjectService } from '../../shared/project.service';
import { Callback } from '../../lib/callback';

@Component({
  selector: 'zoom-component',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
  projectService: ProjectService;
  public project: Proj;

  
  
  
  public position: number;
  
  private isMouseDown: boolean;

  @ViewChild('progressdiv')
  progress: ElementRef;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.project = this.projectService.currentProject;
    this.position = 0;    
    this.isMouseDown = false;

  }


  ngOnInit() {


  }
  ngAfterContentChecked() {
    
      
      this.setPositionValue();
      


    


  }

  setPositionValue() {
    if(this.project && this.project.activeWorkspace)
    //buradaki 3 değeri maximum zoom değeri
    this.position = this.project.activeWorkspace.zoom*100 / (3);
    
  }


  zoomIn() {

    if (this.project && this.project.activeWorkspace) {
      this.project.activeWorkspace.zoomIn();      
      this.setPositionValue();

    }

  }
  zoomOut() {

    if (this.project && this.project.activeWorkspace) {
      this.project.activeWorkspace.zoomOut();
      
      this.setPositionValue();

    }

  }

  mouseDownProgress(event: MouseEvent){
    if(this.project && this.project.activeWorkspace){
      
      //debugger;
       
       let boundingRect = (<HTMLDivElement>this.progress.nativeElement).getBoundingClientRect();      
       let x= event.pageX-boundingRect.left;
      //let x= event.offsetX;
       //buradaki 3 değeri maximum zoom değeridir
       let val = (x*3/boundingRect.width);     
       
       this.project.activeWorkspace.zoomTo(val);        
       this.setPositionValue();
    }
  }
  mouseDown(){
    
    this.isMouseDown= true;
  }
  mouseMove(event: MouseEvent){
    if(this.isMouseDown && this.project && this.project.activeWorkspace){
      
       let x= event.movementX;
       
       let boundingRect = (<HTMLDivElement>this.progress.nativeElement).getBoundingClientRect();       
       //buradaki 3 değeri maximum zoom değeridir
       let val = (x*3/boundingRect.width);     
       
       this.project.activeWorkspace.zoomTo(this.project.activeWorkspace.zoom+val);        
       this.setPositionValue();
       

    }
  }
  mouseUp(){
    this.isMouseDown = false;
  }

  mouseLeave(){
    
    this.isMouseDown = false;
  }

  public currentZoom():number{    
    if(this.project && this.project.activeWorkspace)
    return Math.ceil(this.project.activeWorkspace.zoom*100);

    return 0;
  }

}
