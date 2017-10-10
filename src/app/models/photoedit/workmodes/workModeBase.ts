import { Workspace } from './../workSpace';
import { Layer } from '../layer';
export abstract class WorkModeBase {
    protected workspace: Workspace;
    protected canvasElement: any;
    constructor(workspace: Workspace, disposeSelect: boolean = true, disposeWork: boolean = true) {
      this.workspace = workspace;
      if (this.workspace.selectionLayer && disposeSelect) {
        this.canvasElement = this.workspace.selectionLayer.htmlElement;
        this.workspace.removeSelectionLayer();//.selectionLayer.dispose();    
        
      }
  
      if (this.workspace.workLayer && disposeWork) {
        this.canvasElement = this.workspace.workLayer.htmlElement;
        this.workspace.removeWorkLayer();      
        
      }
  
      this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event); });
    }
  
    public mouseMove(event: MouseEvent) {
  
      this.workspace.layers.forEach((item) => {
        if (item.isSelected)
          item.mouseMove(event);
      });
  
    }
    public abstract get typeOf(): number;
    public abstract get subTypeOf(): string;
  
  
    public mouseDown(event: MouseEvent, layer: Layer) {
  
      this.workspace.layers.forEach((item) => {
        if (item.isSelected && item.hitMouseEvent(event))
          item.mouseDown(event);
      });
  
      //önemli, event stoplanmalı
      event.stopPropagation();
    }
    public mouseUp(event: any) {
  
      this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event); });
    }
  
  
  }