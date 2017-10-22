import { ImageProcessCrop } from './../lib/imageprocess/imageProcessCrop';
import { Callback } from './../lib/callback';
import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { Calc } from '../lib/calc';
import { Rect } from '../lib/draw/rect';
import { Imaging } from '../lib/imagealgorithm/imaging';



export class CmdCrop extends CommandBusy {
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
                        //scale croped retangle
                        
                        if(selectedLayer.scale!=1.0){
                            
                        //cropLayerRect = Calc.scaleRect(cropLayerRect,1/selectedLayer.scale);
                           // cropLayerRect.x-=selectedLayerRect.x;
                           // cropLayerRect.y-=selectedLayerRect.y;

                        }
                        let cropedImage=ImageProcessCrop.process(selectedLayer.getImage(),selectedLayerRect, cropLayerRect,selectedLayer.rotateAngleDeg);
                        if(cropedImage){
                        let newLayer = new LayerImage(cropedImage,"cropedimage");
                            newLayer.scale = selectedLayer.scale;
                            workspace.removeWorkLayer();
                           // workspace.addLayer(newLayer);
                           
                           if(workspace.layers.length>1)
                           workspace.replaceLayer(selectedLayer,newLayer,cropLayerRect.x,cropLayerRect.y);
                           else {
                           
                            workspace.replaceLayer(selectedLayer,newLayer,0,0);
                               workspace.resize(newLayer.width,newLayer.height,new Callback(()=>{
                                
                               }))
                           }
                           
                        }






                    }
                }

          

    }




}
