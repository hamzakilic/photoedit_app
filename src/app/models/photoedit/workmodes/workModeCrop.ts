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
    
      public mouseMove(event: MouseEvent) {
        if (this.workspace.workLayer)
          this.workspace.workLayer.mouseMove(event);
    
      }
    
      public mouseDown(event: MouseEvent, layer: Layer) {
    
    
        if (this.workspace.workLayer == undefined) {
    
          var rect = this.workspace.nativeElement.getBoundingClientRect();
          let mouseX = (event.pageX - rect.left) + window.scrollX;
          let mouseY = (event.pageY - rect.top) + window.scrollY;
          //buradaki 50 ve 50 workspace margin left ve top değerleri;
          let worklayer = this.createLayer(0, 0, mouseX - 50, mouseY - 50);
          worklayer.mouseDownSelectedPoint(event, 6);
          if (this.workspace.workLayer)
            this.workspace.workLayer.dispose();
          this.workspace.workLayer = worklayer;
          // this.workspace.selectionLayer.mouseDown(event);
        }
    
      }
      public mouseUp(event: any) {
        if (this.workspace.workLayer)
          this.workspace.workLayer.mouseUp(event);
      }
      protected createLayer(width: number, height: number, left: number, top: number) {
        return new LayerCropRectangle(width, height, left, top);
      }
    
    
    
    }
    