import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../../lib/message';
import { MessageBus } from '../../lib/messageBus';
import { Constants } from '../../lib/constants';

import { ProjectService } from '../project.service';
import { AppService } from '../../app.service';
import { Workspace } from '../project/workSpace';
import { LayerEmpty } from '../project/layerEmpty';
import { LayerImage } from '../project/layerImage';
import { Calc } from '../../lib/calc';
import { Rect } from '../../lib/draw/rect';
import { Imaging } from '../../lib/imagealgorithm/imaging';



export class CmdRotateWorkspace extends CommandBusy {
    
   
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService,appService);

       
    }



    protected execute(): void {
       
            if (this.projectService.currentProject)
                if (this.projectService.currentProject.activeWorkspace) {
                    let workspace = this.projectService.currentProject.activeWorkspace;
                        if(workspace)
                            workspace.rotate90();

                    }
                

          

    }




}