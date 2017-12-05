import { Point } from './../../../lib/draw/point';
import { Workspace } from './../workSpace';
import { Layer } from '../layer';
export abstract class WorkModeBase {
    protected workspace: Workspace;
    protected canvasElement: any;
    constructor(workspace: Workspace,disposeSelect: boolean = true, disposeWork: boolean = true) {
      this.workspace = workspace;
      if (this.workspace.selectionLayer && disposeSelect) {
        this.canvasElement = this.workspace.selectionLayer.htmlElement;
        this.workspace.removeSelectionLayer();
        
      }
  
      if (this.workspace.workLayer && disposeWork) {
        this.canvasElement = this.workspace.workLayer.htmlElement;
        this.workspace.removeWorkLayer();      
        
      }
      this.workspace.layers.forEach((item)=>item.canResizeOrRotate=false);
      //this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event,scroll); });
    }
  
    public mouseMove(event: MouseEvent,scroll:Point) {
  
      this.workspace.layers.forEach((item) => {
        if (item.isSelected)
          item.mouseMove(event,scroll);
      });
  
    }
    public abstract get typeOf(): number;
    public abstract get subTypeOf(): string;
  
  
    public mouseDown(event: MouseEvent,scroll:Point) {
  
      this.workspace.layers.forEach((item) => {
        if (item.isSelected && item.hitMouseEvent(event,scroll))
          item.mouseDown(event,scroll);
      });
  
      //önemli, event stoplanmalı
      event.stopPropagation();
    }
    public mouseUp(event: any,scroll:Point) {
  
      this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event,scroll); });
    }

    public doubleClick(event: MouseEvent,scroll:Point) {
      
          this.workspace.layers.forEach((item) => {
            if (item.isSelected && item.hitMouseEvent(event,scroll))
              item.doubleClick(event,scroll);
          });
      
          //önemli, event stoplanmalı
          event.stopPropagation();
        }
  
  
  }