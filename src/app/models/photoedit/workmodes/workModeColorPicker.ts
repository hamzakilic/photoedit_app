import { Point } from './../../../lib/draw/point';
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
  
    public mouseMove(event: MouseEvent,scroll:Point) {
      if (this._isMouseDown)
          this.findPointInLayers(event,scroll);
        
    }
  
    public mouseDown(event: MouseEvent,scroll:Point) {
      this._isMouseDown = true;    
       this.findPointInLayers(event,scroll);
    }
    public mouseUp(event: any,scroll:Point) {
      this._isMouseDown = false;
      this.workspace.setWorkingMode(this._previousWorkMode);
  
    }
  
    private findPointInLayers(event: MouseEvent,scroll:Point) {
      for (let i = this.workspace.layers.length - 1; i > -1; --i) {
        let ly = this.workspace.layers[i];
        let hitPoint = ly.hitMouseEvent(event,scroll);
        if (hitPoint) {
          let color = ly.getPixel(hitPoint.x, hitPoint.y);
          if (color.a != 0) {
            this.workspace.foregroundColor = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            return;
          }
        }
      }
    }
  
  
  }