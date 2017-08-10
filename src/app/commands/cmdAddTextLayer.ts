import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerText } from '../models/photoedit/layerText';
import { Text } from "../entities/text";
 


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
                            let text=new Text();
                            text.data="Buraya metin giriniz";
                            text.color="#000000";
                            text.fontFamily="Times New Roman";
                            text.fontSize=32;
                            let textLayer= new LayerText(text,"Text");
                        
                            workspace.addLayer(textLayer); 
                            workspace.makeLayerSelected(textLayer);
                        }

                    }
                

          

    }




}
