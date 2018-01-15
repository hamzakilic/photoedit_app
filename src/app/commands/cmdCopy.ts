


import { ClipboardService, ClipboardData } from './../services/clipboard.service';
import { AppService } from './../services/app.service';
import { LayerImage } from './../models/photoedit/layerImage';
import { ImageAlgorithmCrop } from './../lib/imagealgorithm/imageAlgorithmCrop';
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';

import { HImage } from '../lib/image';
import { LayerSelect } from '../models/photoedit/layerSelect';
import { AlertItem } from '../entities/alertItem';
import { Point } from '../lib/draw/point';
import { Graphics } from '../lib/graphics';
import { Rect } from '../lib/draw/rect';
import { Callback } from '../lib/callback';
import { CommandBusy, CommandNotBusy } from './commandBusy';
import { Polygon } from '../lib/draw/polygon';
import { HMath } from '../lib/hMath';



export class CmdCopy extends CommandNotBusy {
  
  
  clipboardService:ClipboardService;
  constructor(projectService: ProjectService,appService:AppService,clipboardService:ClipboardService) {
    super(projectService,appService);

    
    this.clipboardService=clipboardService;
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

           if(!selectionLayer && selectedLayer){
             //var olan layerdan bir kopya çıkardık
            this.clipboardService.set(new ClipboardData(ClipboardData.Types.Image,selectedLayer.getImage()));
            this.appService.showAlert(new AlertItem('info','Copied',2000));
            return;
           }

           let polygons = selectionLayer.polygons;
           polygons.forEach((poly)=>{
               
               let rectLayer=selectedLayer.rectRotated2D;               
               let polygonSelectedLayer=HMath.rect2DToPolygon(rectLayer);               
               let intersectedPoly= poly.intersect(polygonSelectedLayer);
               if(intersectedPoly.points.length==0){
                 //eğer selected layer ile  kesişim yok ise
                 this.appService.showAlert(new AlertItem("warning","Please intersect with selected layer"));
                 return;
               }               
               
               if(selectedLayer.rotateAngleDeg!=0){
                let centerPoint=new Point(selectedLayer.rectRotated.x+selectedLayer.rectRotated.width/2,selectedLayer.rectRotated.y+selectedLayer.rectRotated.height/2);                  
                
                  let temp=intersectedPoly.points.map(point=>{
                  return HMath.rotatePoint(point,-selectedLayer.rotateAngleDeg, centerPoint);
                });
                intersectedPoly=new Polygon(temp);
                
               }
               intersectedPoly=intersectedPoly.translate(-(selectedLayer.marginLeft),-(selectedLayer.marginTop));
               let rect=intersectedPoly.bounds;
               
              
               let crop=new ImageAlgorithmCrop(rect);
               let cropedImage =crop.process(selectedLayer.getImage());
               intersectedPoly=intersectedPoly.translate(-rect.x,-rect.y);
               rect=intersectedPoly.bounds;
               //intersectedPoly=intersectedPoly.translate(-(selectedLayer.marginLeft),-(selectedLayer.marginTop));
               //let rect=intersectedPoly.bounds;
              
               let canvas=document.createElement('canvas');
               canvas.width=cropedImage.width;
               canvas.height=cropedImage.height;
               let graphics=new Graphics(canvas,canvas.width,canvas.height,1);
               graphics.save();
               
               graphics.drawPolygon(intersectedPoly,false);
               graphics.clip();
               graphics.drawImageRect(cropedImage,new Rect(0,0,canvas.width,canvas.height),new Rect(0,0,canvas.width,canvas.height),Callback.from(()=>{
              
                //this is inside of 
                graphics.restore();
                let maskedImage= graphics.getImage();
                graphics.dispose();
                this.clipboardService.set(new ClipboardData(ClipboardData.Types.Image,maskedImage));
                this.appService.showAlert(new AlertItem('info','Copied',2000));
                canvas=null;
                //let newLayer=new LayerImage(maskedImage,'copy');
                //workspace.addLayer(newLayer);

               }));
               
               
           });

      }
    }

  }




}
