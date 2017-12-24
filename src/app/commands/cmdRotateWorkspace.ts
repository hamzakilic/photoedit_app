import { Callback } from './../lib/callback';
import { History } from './../models/photoedit/history/history';
import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { HMath } from '../lib/hMath';
import { Rect } from '../lib/draw/rect';




export class CmdRotateWorkspace extends CommandBusy {
    
   
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService,appService);

       
    }



    protected execute(): void {
       
            if (this.projectService.currentProject)
                if (this.projectService.currentProject.activeWorkspace) {
                    let workspace = this.projectService.currentProject.activeWorkspace;
                        if(workspace){                            
                            workspace.rotate90();
                            this.history(workspace);
                        }

                    }
                

          

    }
    private history(workspace:Workspace){
 /** history part starts */
 let history = History.create().setUndo(Callback.from(()=>{
    workspace.rotate90();
    workspace.rotate90();
    workspace.rotate90();
}));
workspace.historyManager.add(history,Callback.from(()=>{
    workspace.rotate90();
}));
/** history part ends */
    }




}
