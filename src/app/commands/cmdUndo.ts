
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';

import { AppService } from '../services/app.service';
import { ClipboardService, ClipboardData } from '../services/clipboard.service';
import { AlertItem } from '../entities/alertItem';
import { Callback } from '../lib/callback';
import { CommandBusy } from './commandBusy';



export class CmdUndo extends CommandBusy {
  
  
  
  constructor(projectService: ProjectService,appService:AppService) {
    super(projectService,appService); 
    
  }

  protected execute(): void {
    if (this.projectService.currentProject) {
      let workspace = this.projectService.currentProject.activeWorkspace;
      if(workspace){
        workspace.historyManager.undo();
      }
    }
}
}