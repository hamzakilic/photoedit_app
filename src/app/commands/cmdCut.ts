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
import { Graphics } from '../lib/graphics';
import { Rect } from '../lib/draw/rect';
import { AppService } from '../services/app.service';
import { ClipboardService, ClipboardData } from '../services/clipboard.service';
import { AlertItem } from '../entities/alertItem';
import { Callback } from '../lib/callback';
import { CommandBusy } from './commandBusy';
import { Polygon } from '../lib/draw/polygon';
import { Point } from '../lib/draw/point';
import { HMath } from '../lib/hMath';
import { Layer } from '../models/photoedit/layer';
import { History } from '../models/photoedit/history/history';



export class CmdCut extends CommandBusy {
  zoomType: number;
  
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

           if(!selectionLayer){
             //selectionLayer yok ise, bir alan seçili değildi ne yapacağız peki
             this.appService.showAlert(new AlertItem('warning','Please intersect with selected layer',2000));
            return;
           }

           let history=this.history(workspace,selectedLayer.clone(),selectionLayer.clone());
           this.process(history,workspace,selectionLayer,selectedLayer);

           
      }
    }    

  }

  private process(history:History,workspace:Workspace, selectionLayer:LayerSelect,selectedLayer:Layer){
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
            //intersectedPoly=intersectedPoly.translate(-rect.x,-rect.y);
            //rect=intersectedPoly.bounds;
              
               let canvas=document.createElement('canvas');
               canvas.width=cropedImage.width;
               canvas.height=cropedImage.height;
               let graphics=new Graphics(canvas,canvas.width,canvas.height,1);
               graphics.save();
               let tempPoly=intersectedPoly.translate(-rect.x,-rect.y);
               //rect=intersectedPoly.bounds;
               graphics.drawPolygon(tempPoly,false);               
               graphics.clip();
               graphics.drawImageRect(cropedImage,new Rect(0,0,canvas.width,canvas.height),new Rect(0,0,canvas.width,canvas.height),Callback.from(()=>{
              
                //this is inside of 
                graphics.restore();
                
                let maskedImage= graphics.getImage();
                graphics.dispose();
                
                canvas=null;
                selectedLayer.graphics.save();                                
                selectedLayer.graphics.drawPolygon(intersectedPoly,false);
                selectedLayer.graphics.clip();
                selectedLayer.graphics.setBlendMode('destination-out');
                selectedLayer.graphics.fillRect(rect,"FFFFFF");
                selectedLayer.graphics.restore();
                  
                this.historyRedo(history,workspace,selectedLayer.clone(),selectionLayer.clone());
                
                this.clipboardService.set(new ClipboardData(ClipboardData.Types.Image,maskedImage));
                this.appService.showAlert(new AlertItem('info','Cutted',2000));
                //let newLayer=new LayerImage(maskedImage,'cut');
                //workspace.addLayer(newLayer);

               }));
               
               
           });

  }


  private historyRedo(history:History, workspace:Workspace, selectedLayer:Layer,selectionLayer:LayerSelect){
    ///test codes
     /*  let tempwindow=window.open("","a");      
      let canvas=tempwindow.document.createElement('canvas');
      canvas.width=selectedLayer.width;
      canvas.height=selectedLayer.height;
      tempwindow.document.body.appendChild(canvas);
      let graphics=new Graphics(canvas,canvas.width,canvas.height,1);
      let img=(selectedLayer as LayerImage).hImage;
      graphics.save();
      graphics.drawImageRect(img,new Rect(0,0,img.width,img.height),new Rect(0,0,img.width,img.height));
      graphics.restore();
 */
      workspace.historyManager.add(history,Callback.from(()=>{
      let clonedLayer=selectedLayer.clone();
      workspace.replaceHistoryLayer(clonedLayer.uuid,clonedLayer);
      workspace.makeLayerSelected(clonedLayer);
      workspace.replaceSelectionLayer(selectionLayer.clone());
    
      
    }))
  }

  private history(workspace:Workspace, selectedLayer:Layer,selectionLayer:LayerSelect):History{
    //test codes
   /*  let tempwindow=window.open("","a");      
    let canvas=tempwindow.document.createElement('canvas');
    canvas.width=selectedLayer.width;
    canvas.height=selectedLayer.height;
    tempwindow.document.body.appendChild(canvas);
    let graphics=new Graphics(canvas,canvas.width,canvas.height,1);
    let img=(selectedLayer as LayerImage).hImage;
    graphics.save();
    graphics.drawImageRect(img,new Rect(0,0,img.width,img.height),new Rect(0,0,img.width,img.height));
    graphics.restore(); */

     let history= History.create().setUndo(Callback.from(()=>{
        let clonedLayer= selectedLayer.clone();
        workspace.replaceHistoryLayer(clonedLayer.uuid,clonedLayer);
        workspace.makeLayerSelected(clonedLayer);        
        workspace.replaceSelectionLayer(selectionLayer.clone());
       
      }));
     return history;
    
  }




}
