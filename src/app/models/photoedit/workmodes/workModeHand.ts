import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";

export class WorkModeHand extends WorkModeBase {
    
      constructor(workspace: Workspace) {
        super(workspace);
        this.workspace.cssClasses = "mouseDefault";
    
      }
      public get typeOf(): number {
        return Workspace.WorkModeDefault;
      }
      public get subTypeOf(): string {
        return "";
      }
    }