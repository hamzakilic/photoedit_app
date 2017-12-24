
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
import {History} from "../models/photoedit/history/history";
import { Callback } from '../lib/callback';



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
                            text.alignH="left";
                            text.alignV="top";
                            text.isStroked=false;
                            text.strokedColor="#000";
                            let textLayer= new LayerText(text,"Text");                            
                            workspace.addLayer(textLayer); 
                            workspace.makeLayerSelected(textLayer);
                            this.history(workspace,textLayer);
                         
                            
                        }

                    }
                

          

    }

    private history(workspace,textLayer){
        let history = History.create().setUndo(Callback.from(()=>{
            //find the layer with same name and remove it
            let findedLayer= workspace.layers.findIndex(p=>p.uuid==textLayer.uuid)
            if(findedLayer>=0)
                workspace.layers.splice(findedLayer,1);
        }));

        let clonedtextLayer= textLayer.clone();
        workspace.historyManager.add(history,Callback.from(()=>{                                
            let templayer=clonedtextLayer.clone()
            workspace.addLayer(templayer);
            workspace.makeLayerSelected(templayer);
        }))
    }




}
