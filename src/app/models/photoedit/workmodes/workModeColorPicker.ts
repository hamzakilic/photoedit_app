import { AppService } from './../../../services/app.service';
import { Point } from './../../../lib/draw/point';
import { IWorkspace,WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';


export class WorkModeColorPicker extends WorkModeBase {
    private _previousWorkMode: number;
    private _previousWorkModeSub: string;
    private _isMouseDown = false;
    constructor(workspace: IWorkspace,appService:AppService, previousMode: WorkModeBase) {
      //dont dispose previous workmode          
      super(workspace,appService, false,true);
      this._previousWorkMode = previousMode.typeOf;
      this._previousWorkModeSub=previousMode.subTypeOf;
      this.workspace.cssClasses = "default";
      
  
    }
    public get typeOf(): number {
      return WorkModes.ColorPicker;
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
      this.workspace.selectWorking(this._previousWorkMode,this._previousWorkModeSub);
  
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