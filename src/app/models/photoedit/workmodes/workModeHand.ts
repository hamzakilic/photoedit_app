import { AppService } from './../../../services/app.service';

import { LayerEmpty } from './../layerEmpty';
import { Point } from './../../../lib/draw/point';
import { IWorkspace,WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";

export class WorkModeHand extends WorkModeBase {
 
  private _isMouseDown = false;
  constructor(workspace: IWorkspace,appService:AppService) {
    //dont dispose previous workmode          
    super(workspace,appService, false,true);
    
    this.workspace.cssClasses = "mouseHand";
    this.workspace.workLayer = new LayerEmpty("hand layer", this.workspace.width, this.workspace.height);
    this.workspace.workLayer.scale=this.workspace.scale;
    
    

  }
  public get typeOf(): number {
    return WorkModes.WorkModeHand;
  }
  public get subTypeOf(): string {
    return "";
  }

  public mouseMove(event: MouseEvent,scroll:Point) {
    if (this._isMouseDown)
        this.scrollBy(event,scroll);
        
      
  }
  scrollBy(event: MouseEvent, scroll:Point) {
    
    this.workspace.scrollBy(-event.movementX,-event.movementY);
  }


  public mouseDown(event: MouseEvent,scroll:Point) {
    this._isMouseDown = true;    
     
  }
  public mouseUp(event: any,scroll:Point) {
    this._isMouseDown = false;
    

  }

  
  }