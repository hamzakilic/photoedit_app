import { Point } from './../../../lib/draw/point';
import { LayerCropRectangle } from './../layerCropRectangle';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';

export class WorkModeCrop extends WorkModeBase {
    
      constructor(workspace: Workspace) {
        super(workspace);
        this.workspace.cssClasses = "mouseCross";
    
    
      }
      public get typeOf(): number {
        return Workspace.WorkModeCrop;
      }
      public get subTypeOf(): string {
        return "";
      }
    
      public mouseMove(event: MouseEvent,scroll:Point) {
       // if (this.workspace.workLayer)
        //  this.workspace.workLayer.mouseMove(event,scroll);
    
      }
    
      public mouseDown(event: MouseEvent,scroll:Point) {
    
    
        if (this.workspace.workLayer == undefined) {
    
          var rect = this.workspace.htmlElement.nativeElement.getBoundingClientRect();
          
          let mouseX = (event.clientX+scroll.X)/this.workspace.scale;
          let mouseY = (event.clientY+scroll.Y) /this.workspace.scale;
          console.log(event.clientX,event.clientY,rect.left,rect.top, mouseX,mouseY);
          //buradaki 50 ve 50 workspace margin left ve top değerleri;
          let worklayer = this.createLayer(100, 100, mouseX-50, mouseY-50);
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
    