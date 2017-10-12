import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from '../../models/photoedit/workSpace';
import { LayerCropRectangle } from '../../models/photoedit/layerCropRectangle';
import {  CmdCrop } from '../../commands/cmdCrop';
import { ProjectService } from '../../services/project.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'crop-properties-component',
  templateUrl: './crop-properties.component.html',
  styleUrls: ['./crop-properties.component.scss']
})
export class CropPropertiesComponent implements OnInit {

  @Input()
  workspace:Workspace;
  private _projectService:ProjectService;
  private _appService:AppService;
  constructor(projectService:ProjectService,appService:AppService) {
    this._appService=appService;
    this._projectService=projectService;

   }

  ngOnInit() {
  }

  public get marginLeft():number{
    let layer= this.workspace.workLayer;
    return (layer.marginLeft+layer.width)*this.workspace.scale;
    
  }
  public get marginTop():number{
    let layer= this.workspace.workLayer;
    return (layer.marginTop)*this.workspace.scale;
  }

  public get isVisible():boolean{
    
      if(this.workspace)
        if(this.workspace.workLayer)
          if(this.workspace.workLayer instanceof LayerCropRectangle)            
            return true;
         
    return false;
  }
  public cropOk(){
    let cmd = new CmdCrop(this._projectService,this._appService);
    cmd.executeAsync();

  }
  public cropCancel(){
    this.workspace.removeWorkLayer();
  }

}
