import { Component, OnInit } from '@angular/core';
import { MenubarComponent } from '../menubar/menubar.component';

import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../../services/project.service';
import { Proj } from '../../models/photoedit/proj';

@Component({
  selector: 'layout-component',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public project:Proj;
  constructor(projectService:ProjectService) {
    this.project=projectService.currentProject;
  }
  
  ngOnInit() {
    /afasfd/
  }

  public get hasLayer():boolean{
    if(this.project && this.project.activeWorkspace && this.project.activeWorkspace.hasLayer)
      return true;
    return false;
  }
  public get hasActiveWorkspace():boolean{
    if(this.project && this.project.activeWorkspace)
    return true;
  return false;
  }

  public get hasSelectionLayer():boolean{
    let hasLayer = this.hasLayer 
    if(hasLayer)
    if(this.project.activeWorkspace.selectionLayer)
      return hasLayer;
    return false;
  }

  public get isAdvert():boolean{
    return false;
  }

}
