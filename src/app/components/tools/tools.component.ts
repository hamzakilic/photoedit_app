import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Workspace } from '../../shared/project/workSpace';
import { Layer } from '../../shared/project/layer';

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


  public iddefault= "iddefault";
  public idcrop="idcrop";

  removeActiveCss(){
    var labels = document.querySelectorAll(".toolsInfo > section > div > div > label");
    for(let i = 0; i<labels.length;++i)
      labels.item(i).classList.remove("active");
  }
  makeActiveCss(id){
    var labels = document.querySelectorAll(".toolsInfo > section > div > div > label");
    for(let i = 0; i<labels.length;++i)
    if(labels.item(i).id==id){
      debugger;
      labels.item(i).classList.add("active");
    }

  }

  selectDefault(){

    if(this.project)
    if(this.project.activeWorkspace){
      this.project.activeWorkspace.selectWorking(Workspace.WorkModeDefault);
      this.removeActiveCss();
      this.makeActiveCss(this.iddefault);
    }

  }

  selectCrop(){

    if(this.project)
    if(this.project.activeWorkspace){
      this.project.activeWorkspace.selectWorking(Workspace.WorkModeCrop);
      this.removeActiveCss();
      this.makeActiveCss(this.idcrop);

    }

  }

}
