import { AppService } from './../../services/app.service';
import { CmdLayerRemove } from './../../commands/cmdLayerRemove';
import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/photoedit/project';
import { Workspace } from '../../models/photoedit/workSpace';
import { Layer } from '../../models/photoedit/layer';

@Component({
  selector: 'layersInfo-component',
  templateUrl: './layers-info.component.html',
  styleUrls: ['./layers-info.component.scss']
})
export class LayersInfoComponent implements OnInit {

  projectService: ProjectService;
  private composite:Map<string,boolean>;
  
  public project: Project;
  private appService:AppService;
  

  constructor(projectService: ProjectService,appService:AppService) {
    this.appService=appService;
    this.projectService = projectService;
    this.project= this.projectService.currentProject;
    this.composite=new Map<string,boolean>();

   }

  ngOnInit() {

  }
  removeLayer(layer: Layer){
    let cmd=new CmdLayerRemove(layer,this.projectService,this.appService);
    cmd.executeAsync();
  }
  disableOrEnable(layer:Layer){
   // alert(layer.name);

   layer.isHidden = !layer.isHidden;
   // this.projectService.currentProject.activeWorkspace.render();
  }

  public get layers(){
    //make composite
    
    if(this.project && this.project.activeWorkspace){
      return this.project.activeWorkspace.layers;
    }
    return [];
  }

  public makeLayerSelected(layer:Layer){
    if(this.project && this.project.activeWorkspace){
      this.project.activeWorkspace.makeLayerSelected(layer);
    }
  }

  public isEditMode(layer:Layer){
      if(layer){
        if(this.composite.has(layer.uuid))
        return this.composite.get(layer.uuid)
        else this.composite.set(layer.uuid,false);
      }
  }
  public mouseDblClick(layer:Layer){
    if(layer){      
      this.composite.set(layer.uuid,true)
      
    }
  }
  keyDown(event:KeyboardEvent, layer:Layer){
    
    if(event.keyCode==13){
      event.preventDefault();
      event.stopPropagation();
      if(layer){
        this.composite.set(layer.uuid,false);
      }
    }
    
  }

  changeLayerName(event:any, layer:Layer){
    
   if(layer)
   layer.name=event.currentTarget.value;
  }

  lostfocus(layer:Layer){  
    console.log('lost focus'+new Date())  
    if(layer){
      this.composite.set(layer.uuid,false);
    }
  }

  layerName(layer:Layer){   
    return layer.name;
  }

  onDrop(event:any,destinationuuid:string){
     if(event.dragData && destinationuuid){
       let sourceuuid:string=event.dragData;
       if(sourceuuid==destinationuuid)
        return;
       
       let workspace=this.project.activeWorkspace;
       if(!workspace)
       return;
       let sourceIndex =workspace.layers.findIndex((p)=>p.uuid==sourceuuid);
       let destinationIndex=workspace.layers.findIndex((p)=>p.uuid==destinationuuid);
       if(sourceIndex>=0 && destinationIndex>=0){
         let sourceLayer= workspace.layers[sourceIndex];
         workspace.layers.splice(sourceIndex,1);
         workspace.layers.splice(destinationIndex,0,sourceLayer);
       }
     }
  }
  


}
