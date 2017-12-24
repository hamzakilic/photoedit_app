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

import { ImageAlgorithmColorRemap } from '../lib/imagealgorithm/imageAlgorithmColorRemap';
import { Layer } from '../models/photoedit/layer';
import { History } from '../models/photoedit/history/history';


export class CmdColorRemap extends CommandBusy {

    private _effectService: EffectService;
    private _effectName:string;
    constructor(effectName:string, projectService: ProjectService, appService: AppService, effectService: EffectService) {
        super(projectService, appService);
        this._effectService = effectService;
        this._effectName=effectName;


    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.layers.length > 0
                     && this._effectService.effects && this._effectService.effects.items) {
                    let effectValue = this._effectService.effects.items.find(p => p.name === this._effectName);
                    if (effectValue) {


                        let selectedLayer = workspace.layers.find((layer) => layer.isSelected);
                        if (!selectedLayer) {
                            //selected layer yok ise layer 0 crop yapılacak
                            selectedLayer = workspace.layers[0];

                        }

                        if (selectedLayer) {
                            let effect = new ImageAlgorithmColorRemap(effectValue);
                            let img = effect.process(selectedLayer.getImage());
                            let newLayer = new LayerImage(img, selectedLayer.name);

                            this.history(workspace,selectedLayer.clone(),newLayer.clone());

                            workspace.replaceLayer(selectedLayer, newLayer);
                            

                        }
                    }


                }
            }



    }


    private history(workspace:Workspace,selectedLayer:Layer,newLayer:Layer){
        let histo=History.create().setUndo(Callback.from(()=>{
            let temp=selectedLayer.clone();
            workspace.replaceLayer(newLayer,temp);
        }));
        workspace.historyManager.add(histo,Callback.from(()=>{
            
            workspace.replaceLayer(selectedLayer,newLayer.clone());
        }));
    }

}
