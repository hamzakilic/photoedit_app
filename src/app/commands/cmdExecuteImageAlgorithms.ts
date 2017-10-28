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

import { IImageAlgorithm, IImageAlgorithmImmutable,IImageAlgorithmMutable } from '../lib/image';






export class CmdExecuteImageAlgorithms extends CommandBusy {

    private _algorithms:Array<IImageAlgorithm>;
    constructor(algorithms:Array<IImageAlgorithm>,  projectService: ProjectService, appService: AppService) {
        super(projectService, appService);
      this._algorithms=algorithms;


    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {
                   


                        let selectedLayer = workspace.layers.find((layer) => layer.isSelected);
                        if (!selectedLayer) {
                            //selected layer yok ise layer 0 crop yapılacak
                            selectedLayer = workspace.layers[0];

                        }

                        if (selectedLayer) {
                            let img=selectedLayer.getImage();
                            
                            for(let i=0;i<this._algorithms.length;++i){
                                img=this._algorithms[i].process(img);
                            }
                            let newLayer = new LayerImage(img, selectedLayer.name);
                            workspace.replaceLayer(selectedLayer, newLayer);



                        }
                    


                }
            }



    }




}
