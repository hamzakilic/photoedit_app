import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';


export class WorkModeColorPicker extends WorkModeBase {
    private _previousWorkMode: WorkModeBase;
    private _isMouseDown = false;
    constructor(workspace: Workspace, previousMode: WorkModeBase) {
      //dont dispose previous workmode          
      super(workspace, false,true);
      this._previousWorkMode = previousMode;
      this.workspace.cssClasses = "default";
      
  
    }
    public get typeOf(): number {
      return Workspace.WorkModeColorPicker;
    }
    public get subTypeOf(): string {
      return "";
    }
  
    public mouseMove(event: MouseEvent) {
      if (this._isMouseDown)
          this.findPointInLayers(event);
        
    }
  
    public mouseDown(event: MouseEvent, layer: Layer) {
      this._isMouseDown = true;    
       this.findPointInLayers(event);
    }
    public mouseUp(event: any) {
      this._isMouseDown = false;
      this.workspace.setWorkingMode(this._previousWorkMode);
  
    }
  
    private findPointInLayers(event: MouseEvent) {
      for (let i = this.workspace.layers.length - 1; i > -1; --i) {
        let ly = this.workspace.layers[i];
        let hitPoint = ly.hitMouseEvent(event);
        if (hitPoint) {
          let color = ly.getColor(hitPoint.X, hitPoint.Y);
          if (color.a != 0) {
            this.workspace.foregroundColor = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            return;
          }
        }
      }
    }
  
  
  }