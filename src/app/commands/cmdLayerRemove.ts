import { Callback } from './../lib/callback';
import { FormResizeComponent } from './../components/form-resize/form-resize.component';
import { Command } from './command';
import { CommandBusy, CommandNotBusy } from './commandBusy';
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








export class CmdLayerRemove extends CommandNotBusy {

    private _layer:Layer;
    constructor(layer:Layer,  projectService: ProjectService, appService: AppService) {
        super(projectService, appService);
      this._layer=layer;


    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {
                       let findedLayerIndex = workspace.layers.findIndex((layer) => layer.uuid==this._layer.uuid);
                       if(findedLayerIndex>=0){
                         let cloned=workspace.layers[findedLayerIndex].clone();
                          let history=History.create().setUndo(Callback.from(()=>{
                            workspace.layers.splice(findedLayerIndex,0,cloned.clone());

                         }));
                         workspace.historyManager.add(history,Callback.from(()=>{
                            workspace.removeLayer2(cloned.uuid);
                         }));
                         workspace.removeLayer2(cloned.uuid);
                         
                       }

                }
            }



    }




}
