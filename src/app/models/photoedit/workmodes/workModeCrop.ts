import { Point } from './../../../lib/draw/point';
import { LayerCropRectangle } from './../layerCropRectangle';
import { IWorkspace,WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';
import { AppService } from '../../../services/app.service';

export class WorkModeCrop extends WorkModeBase {
    
      constructor(workspace: IWorkspace,appService:AppService) {
        super(workspace,appService);
        this.workspace.cssClasses = "mouseCross";
    
    
      }
      public get typeOf(): number {
        return WorkModes.Crop;
      }
      public get subTypeOf(): string {
        return "";
      }
    
      public mouseMove(event: MouseEvent,scroll:Point) {
        if (this.workspace.workLayer)
          this.workspace.workLayer.mouseMove(event,scroll);
    
      }
    
      public mouseDown(event: MouseEvent,scroll:Point) {
    
    
        if (this.workspace.workLayer == undefined) {
    
          var rect = this.workspace.htmlElement.getBoundingClientRect();
          //buradaki 50 ve 50 workspace margin left ve top değerleri;
         /*  let mouseX = (event.clientX+scroll.x-(rect.left+scroll.x)-50)/this.workspace.scale;
          let mouseY = (event.clientY+scroll.y-(rect.top+scroll.y)-50) /this.workspace.scale; */

          let mouseX = (event.clientX+scroll.x-(rect.left)-50)/this.workspace.scale;
          let mouseY = (event.clientY+scroll.y-(rect.top)-50) /this.workspace.scale;
          
          if(mouseX<0)
          mouseX=0;
          if(mouseY<0)
          mouseY=0;          
          let worklayer = this.createLayer(0, 0, mouseX, mouseY);
          worklayer.scale=this.workspace.scale;
          worklayer.mouseDownSelectedPoint(event, 6);
         
          this.workspace.workLayer = worklayer;
          // this.workspace.selectionLayer.mouseDown(event);
        }
    
      }
      public mouseUp(event: MouseEvent,scroll:Point) {
        if (this.workspace.workLayer)
          this.workspace.workLayer.mouseUp(event,scroll);
      }
      protected createLayer(width: number, height: number, left: number, top: number) {
        return new LayerCropRectangle(width, height, left, top);
      }
    
    
    
    }
    