import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { Proj } from '../../models/photoedit/proj';
import { Workspace } from '../../models/photoedit/workSpace';
import { Layer } from '../../models/photoedit/layer';

@Component({
  selector: 'tools-component',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  projectService: ProjectService;
  public project: Proj;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project= this.projectService.currentProject;
   }

  ngOnInit() {
  }


  

  removeActiveCss(){
    var labels = document.querySelectorAll(".toolsInfo > section > div > div > div> label");
    for(let i = 0; i<labels.length;++i)
      labels.item(i).classList.remove("active");
  }
  makeActiveCss(id){
    var labels = document.querySelectorAll(".toolsInfo > section > div > div > div > label");
    
    for(let i = 0; i<labels.length;++i)
    if(labels.item(i).id==id){
      
      labels.item(i).classList.add("active");
    }

  }

  selectDefault(){

    if(this.project)
    if(this.project.activeWorkspace){
      this.project.activeWorkspace.selectWorking(Workspace.WorkModeDefault);
      this.removeActiveCss();
      this.makeActiveCss("default");
    }

  }

  selectCrop(){
    if(this.project)
      if(this.project.activeWorkspace){
        this.project.activeWorkspace.selectWorking(Workspace.WorkModeCrop);
        this.removeActiveCss();
        this.makeActiveCss("selectCrop");
  
      }

  }

  selectRectangleSelection(){

    if(this.project)
    if(this.project.activeWorkspace){
      this.project.activeWorkspace.selectWorking(Workspace.WorkModeRectangleSelection);
      this.removeActiveCss();
      this.makeActiveCss("selectRectangle");

    }

  }


  selectEllipseSelection(){
    
        if(this.project)
        if(this.project.activeWorkspace){
          this.project.activeWorkspace.selectWorking(Workspace.WorkModeEllipseSelection);
          this.removeActiveCss();
          this.makeActiveCss("selectRectangle");
    
        }
    
      }
    

  selectAddTextLayer(){

  }

}
