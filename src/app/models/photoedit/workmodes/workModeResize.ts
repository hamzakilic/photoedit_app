import { AppService } from './../../../services/app.service';

import { Callback } from './../../../lib/callback';
import { IWorkspace,WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';
import { History } from '../history/history';

export class WorkModeResizeWorkspace extends WorkModeBase {
    private previousWorkingType: number;
    private previousWorkingSubType: string;
    constructor(workspace: IWorkspace,appservice:AppService,  previousWorkingType: number, previousWorkingSubType: string) {
      super(workspace,appservice);
      this.previousWorkingType = previousWorkingType;
      this.previousWorkingSubType = previousWorkingSubType;
      this.workspace.cssClasses = "mouseNWSE";
  
    }
    public get typeOf(): number {
      return WorkModes.ResizeWorkspace;
    }
  
    public get subTypeOf(): string {
      return "";
    }
  
  
    public mouseMove(event: MouseEvent) {
  
      let w = this.workspace.width + event.movementX / this.workspace.scale;
      let h = this.workspace.height + event.movementY / this.workspace.scale;
      if (w > 20 && h > 20) {
        this.workspace.resize(w, h, Callback.empty());
      }
    }
    
    private _urData:UndoRedoData;
    public mouseDown(event: MouseEvent) {
        this._urData={wsWidth:this.workspace.width,
                      wsHeight:this.workspace.height,                     
                    };
        
      
    }
    public mouseUp(event: any) {
      this.createHistory();
      this.workspace.selectWorking(this.previousWorkingType, this.previousWorkingSubType);
    }
    private createHistory(){
      if(!this._urData)return;
       let currentData={wsWidth:this.workspace.width, wsHeight:this.workspace.height};
      let history=History.create().setUndo(Callback.from(()=>{
         this.workspace.resize(this._urData.wsWidth,this._urData.wsHeight,Callback.empty())
      }));

      this.workspace.historyManager.add(history,Callback.from(()=>{
        this.workspace.resize(currentData.wsWidth,currentData.wsHeight,Callback.empty())
      }));


    }


  
  
  }

  interface UndoRedoData{
    wsWidth:number;
    wsHeight:number;   
  }