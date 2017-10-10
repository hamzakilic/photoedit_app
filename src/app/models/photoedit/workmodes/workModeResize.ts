import { Callback } from './../../../lib/callback';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';

export class WorkModeResizeWorkspace extends WorkModeBase {
    private previousWorkingType: number;
    private previousWorkingSubType: string;
    constructor(workspace: Workspace, previousWorkingType: number, previousWorkingSubType: string) {
      super(workspace);
      this.previousWorkingType = previousWorkingType;
      this.previousWorkingSubType = previousWorkingSubType;
      this.workspace.cssClasses = "mouseNWSE";
  
    }
    public get typeOf(): number {
      return Workspace.WorkModeResizeWorkspace;
    }
  
    public get subTypeOf(): string {
      return "";
    }
  
  
    public mouseMove(event: MouseEvent) {
  
      let w = this.workspace.width + event.movementX / this.workspace.scale;
      let h = this.workspace.height + event.movementY / this.workspace.scale;
      if (w > 20 && h > 20) {
        this.workspace.resize(w, h, new Callback(() => { }));
      }
    }
  
    public mouseDown(event: MouseEvent, layer: Layer) {
  
  
    }
    public mouseUp(event: any) {
  
      this.workspace.selectWorking(this.previousWorkingType, this.previousWorkingSubType);
    }
  
  
  }