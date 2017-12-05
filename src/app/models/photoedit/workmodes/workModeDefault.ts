import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";

export class WorkModeDefault extends WorkModeBase {
    
    
      constructor(workspace: Workspace) {
        super(workspace);
        this.workspace.cssClasses = "mouseDefault";
        this.workspace.removeSelectionLayer();
        this.workspace.layers.forEach((item)=>item.canResizeOrRotate=true);
      }
      public get typeOf(): number {
        return Workspace.WorkModeDefault;
      }
      public get subTypeOf(): string {
        return "";
      }
    
    }