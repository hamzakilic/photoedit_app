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
import { HMath } from '../lib/hMath';
import { Rect } from '../lib/draw/rect';
import { ImageAlgorithmCrop } from '../lib/imagealgorithm/imageAlgorithmCrop';
import { Graphics } from '../lib/graphics';
import { LayerSelect } from '../models/photoedit/layerSelect';
import { Layer } from '../models/photoedit/layer';
import { History } from '../models/photoedit/history/history';




export class CmdNewLayerFromSelection extends CommandBusy {
    
    zoomType: number;
   
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService,appService);
        
        
    }



    protected execute(): void {
        if (this.projectService.currentProject) {
          let workspace = this.projectService.currentProject.activeWorkspace;
          if (workspace && workspace.layers.length>0) {
               let indexOfSelected=workspace.layers.findIndex((item)=>item.isSelected);
               if(indexOfSelected<0)
                   indexOfSelected=0;
               let selectedLayer=workspace.layers[indexOfSelected];
               let selectionLayer=workspace.selectionLayer as LayerSelect;
    
               if(!selectionLayer){
                 //selectionLayer yok ise, bir alan seçili değildi ne yapacağız peki
                return;
               }
    
               let polygons = selectionLayer.polygons;
               polygons.forEach((poly)=>{
                   
                   let rect= poly.bounds;
                   let translatedPoly=poly.translate(-rect.x,-rect.y);
                   let crop=new ImageAlgorithmCrop(rect);
                   let cropedImage =crop.process(selectedLayer.getImage());
                  
                   let canvas=document.createElement('canvas');
                   canvas.width=cropedImage.width;
                   canvas.height=cropedImage.height;
                   let graphics=new Graphics(canvas,canvas.width,canvas.height,1);
                   graphics.save();
                   graphics.drawPolygon(translatedPoly,false);
                   graphics.clip();
                   graphics.drawImageRect(cropedImage,new Rect(0,0,canvas.width,canvas.height),new Rect(0,0,canvas.width,canvas.height),Callback.from(()=>{
                  
                    //this is inside of 
                    graphics.restore();
                    let maskedImage= graphics.getImage();
                    graphics.dispose();
                    
                    canvas=null;
                    let newLayer=new LayerImage(maskedImage,'selection');
                    this.history(workspace,newLayer.clone());
                    workspace.addLayer(newLayer);
                    
    
                   }));
                   
                   
               });
    
          }
        }
    
      }

     private history(workspace:Workspace,layer:Layer): void {
        let history=History.create().setUndo(Callback.from(()=>{
            workspace.removeLayer2(layer.uuid);
        }));

        workspace.historyManager.add(history,Callback.from(()=>{
            workspace.addLayer(layer.clone());
        }))
    }
    
    
    
    
    }
    





