import { Command } from './command';
import { Message } from '../../lib/message';
import { MessageBus } from '../../lib/messageBus';
import { Constants } from '../../lib/constants';

import { ProjectService } from '../project.service';
import { Workspace } from '../project/workSpace';
import { LayerEmpty } from '../project/layerEmpty';
import { Callback } from '../../lib/callback';



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
        let layer = new LayerEmpty('new layer', workspace.width, workspace.height);

        workspace.resize(this.width,this.height,new Callback(()=>{}));
      }
    }

  }




}
