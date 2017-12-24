
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { Callback } from '../lib/callback';
import { History } from '../models/photoedit/history/history';



export class CmdResizeWorkspace extends Command {
  width: number;
  height: number;
  projectService: ProjectService;
  constructor(projectService: ProjectService,newWidth?: number, newHeight?: number,) {
    super();

    this.projectService = projectService;
    if(newWidth)
    this.width = newWidth;
    else{
        if(this.projectService.currentProject && this.projectService.currentProject.activeWorkspace){
            this.width =this.projectService.currentProject.activeWorkspace.width * 0.9;
        }
    } 
    if(newHeight)
    this.height = newHeight;
    else {
             if(this.projectService.currentProject && this.projectService.currentProject.activeWorkspace){
            this.height =this.projectService.currentProject.activeWorkspace.height * 0.9;
        }
    }
  }
  protected execute(): void {
    if (this.projectService.currentProject) {
      let workspace = this.projectService.currentProject.activeWorkspace;
      if (workspace) {
        //let layer = new LayerEmpty('new layer', workspace.width, workspace.height);
        let beforeWH={w:workspace.width,h:workspace.height};
        let afterWH={w:this.width,h:this.height};
         workspace.resize(this.width,this.height,Callback.empty());
         this.history(workspace,beforeWH,afterWH);
      }
    }

  }

  private history(workspace:Workspace,before,after){
      let history=History.create().setUndo(Callback.from(()=>{
        workspace.resize(before.w,before.h,Callback.empty());
      }));
      workspace.historyManager.add(history,Callback.from(()=>{
        workspace.resize(after.w,after.h,Callback.empty());
      }))


  }




}
