import { Utility } from './../lib/utility';
import { LayerText } from './../models/photoedit/layerText';

import { ImageAlgorithmFlip } from './../lib/imagealgorithm/imageAlgorithmFlip';
import { Callback } from './../lib/callback';
import { FormResizeComponent } from './../components/form-resize/form-resize.component';
import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { EffectService } from "../services/effect.service";
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';

import { Effect } from '../entities/effect';
import { HMath } from '../lib/hMath';
import { Rect } from '../lib/draw/rect';
import { Layer } from '../models/photoedit/layer';
import { History } from '../models/photoedit/history/history';








export class CmdCloneLayer extends CommandBusy {

    
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService, appService);     
    
    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {
                       let selectedIndex=0;
                       
                        let temp=  workspace.layers.findIndex(p=>p.isSelected);
                        if(temp>=0)
                        selectedIndex=temp;
                        
                       
                       
                         let selectedLayer=workspace.layers[selectedIndex];
                         let newLayer=selectedLayer.clone();
                         newLayer.setuuid(Utility.uuid());                     
                        
                         
                         
                         let clonedSelected=selectedLayer.clone();
                         let clonednewLayer=newLayer.clone();
                          let history=History.create().setUndo(Callback.from(()=>{
                            workspace.removeLayer2(newLayer.uuid);

                         }));
                         workspace.historyManager.add(history,Callback.from(()=>{
                            workspace.addLayer(newLayer.clone());
                         }));
                         workspace.addLayer(newLayer.clone());
                         
                         
                       

                }
            }



    }




}
