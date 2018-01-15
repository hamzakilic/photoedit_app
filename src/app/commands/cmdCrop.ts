import { Headers } from '@angular/http';
import { History } from './../models/photoedit/history/history';
import { ImageProcessCrop } from './../lib/imageprocess/imageProcessCrop';
import { Callback } from './../lib/callback';
import { Command } from './command';
import { CommandBusy, CommandNotBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { HMath } from '../lib/hMath';
import { Rect } from '../lib/draw/rect';
import { Layer } from '../models/photoedit/layer';




export class CmdCrop extends CommandNotBusy {
    zoomType: number;
   
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService,appService);

        
    }



    protected execute(): void {
       
            if (this.projectService.currentProject)
                if (this.projectService.currentProject.activeWorkspace) {
                    let workspace = this.projectService.currentProject.activeWorkspace;
                    if (workspace && workspace.workLayer && workspace.layers.length > 0) {
                        
                        //zaten döndürme olmadığı için sorun yok
                        let cropLayerRect =workspace.workLayer.rect;
                        

                        let isLayer0Crop = false;
                        let selectedLayer = workspace.layers.find((layer) => layer.isSelected);
                        if (!selectedLayer) {
                            //selected layer yok ise layer 0 crop yapılacak
                            selectedLayer = workspace.layers[0];
                            isLayer0Crop = true;
                        }
                        let selectedLayerRect =selectedLayer.rect;
                       
                        
                       
                        let cropedImage=ImageProcessCrop.process(selectedLayer.getImage(),selectedLayerRect, cropLayerRect,0);
                        if(cropedImage){
                        let newLayer = new LayerImage(cropedImage,"cropedimage",selectedLayer.uuid);
                        newLayer.scale = selectedLayer.scale;
                        newLayer.marginLeft=cropLayerRect.x;
                        newLayer.marginTop=cropLayerRect.y;
                        if(workspace.layers.length==1){
                            newLayer.marginLeft=0;
                        newLayer.marginTop=0;
                        }
                            workspace.removeWorkLayer();
                           // workspace.addLayer(newLayer);
                           this.createHistory(workspace, newLayer.clone(),selectedLayer.clone());
                           if(workspace.layers.length>1)
                           workspace.replaceLayer(selectedLayer,newLayer,cropLayerRect.x,cropLayerRect.y);
                           else {
                           
                            workspace.replaceLayer(selectedLayer,newLayer,0,0);
                               workspace.resize(newLayer.width,newLayer.height,Callback.empty())
                           }
                           
                        }

                    }
                }

          

    }
    private createHistory(workspace:Workspace,cropedLayer:Layer,selectedLayer:Layer){
        let wswidth=workspace.width;
        let wsheight=workspace.height;
        let history=History.create().setUndo(Callback.from(()=>{            
            workspace.replaceHistoryLayer(selectedLayer.uuid,selectedLayer);
            workspace.resize(wswidth,wsheight,Callback.empty());
        }))
        workspace.historyManager.add(history,Callback.from(()=>{
            
            workspace.replaceHistoryLayer(cropedLayer.uuid,cropedLayer);
            if(workspace.layers.length==1){
                workspace.resize(cropedLayer.width,cropedLayer.height,Callback.empty())
                
                }            

        }));
    }




}
