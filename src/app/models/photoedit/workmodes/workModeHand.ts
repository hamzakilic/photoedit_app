
import { LayerEmpty } from './../layerEmpty';
import { Point } from './../../../lib/draw/point';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";

export class WorkModeHand extends WorkModeBase {
 
  private _isMouseDown = false;
  constructor(workspace: Workspace) {
    //dont dispose previous workmode          
    super(workspace, false,true);
    
    this.workspace.cssClasses = "mouseHand";
    this.workspace.workLayer = new LayerEmpty("hand layer", this.workspace.width, this.workspace.height);
    this.workspace.workLayer.scale=this.workspace.scale;
    
    

  }
  public get typeOf(): number {
    return Workspace.WorkModeHand;
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