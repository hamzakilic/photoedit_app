import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../../lib/message';
import { MessageBus } from '../../lib/messageBus';
import { Constants } from '../../lib/constants';

import { ProjectService } from '../project.service';
import { AppService } from '../../app.service';
import { Workspace } from '../project/workSpace';
import { LayerEmpty } from '../project/layerEmpty';
import { LayerText } from '../project/layerText';

 


export class CmdAddTextLayer extends Command {
    
   projectService:ProjectService;
    constructor(projectService: ProjectService, appService: AppService) {
        super();
        this.projectService=projectService;

       
    }



    protected execute(): void {
       
            if (this.projectService.currentProject)
                if (this.projectService.currentProject.activeWorkspace) {
                    let workspace = this.projectService.currentProject.activeWorkspace;
                        if(workspace){
                            let textLayer= new LayerText("Buraya Metin Giriniz","Arial",10,"Text");
                        
                            workspace.addLayer(textLayer); 
                            workspace.makeLayerSelected(textLayer);
                        }

                    }
                

          

    }




}
