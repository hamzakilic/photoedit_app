
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
                            text.data="Enter text here";
                            text.color="rgb(0,0,0)";
                            text.fontFamily="Times New Roman";
                            text.fontSize=32;
                            text.alignH="left";
                            text.alignV="top";
                            text.isStroked=false;
                            text.strokedColor="rgb(0,0,0)";
                            let textLayer= new LayerText(text,"Text");                            
                            workspace.addLayer(textLayer); 
                            workspace.makeLayerSelected(textLayer);
                            this.history(workspace,textLayer.uuid, textLayer.clone());
                         
                            
                        }

                    }
                

          

    }

    private history(workspace:Workspace,uuid:string,textLayer){
        let history = History.create().setUndo(Callback.from(()=>{
         
            //find the layer with same name and remove it
            let findedLayer= workspace.layers.findIndex(p=>p.uuid==uuid)
            if(findedLayer>=0)
                workspace.layers.splice(findedLayer,1);
        }));

        let clonedtextLayer= textLayer.clone();
        workspace.historyManager.add(history,Callback.from(()=>{
            
            
            let templayer=clonedtextLayer;
            workspace.addLayer(templayer);            
            workspace.makeLayerSelected(templayer);
            templayer.invalidate();
        }))
    }




}
