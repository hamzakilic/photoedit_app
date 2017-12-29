
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








export class CmdFlipImage extends CommandBusy {

    private _isHorizontal;
    protected findedLayerIndex;
    constructor(isHorizontal:boolean, projectService: ProjectService, appService: AppService) {
        super(projectService, appService);     
        this._isHorizontal=isHorizontal;
        this.findedLayerIndex=-1;

    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {
                       
                       if(this.findedLayerIndex<0){
                           this.findedLayerIndex= workspace.layers.findIndex(p=>p.isSelected);
                       }
                       if(this.findedLayerIndex>=0){
                           let selectedLayer=workspace.layers[this.findedLayerIndex];
                         let algorithm=new ImageAlgorithmFlip(this._isHorizontal);
                         let img=algorithm.process(selectedLayer.getImage());
                         let newLayer=new LayerImage(img,selectedLayer.name,selectedLayer.uuid);
                         newLayer.marginLeft=selectedLayer.marginLeft;
                         newLayer.marginTop=selectedLayer.marginTop;
                         newLayer.rotateAngleDeg=selectedLayer.rotateAngleDeg;
                         
                         let clonedSelected=selectedLayer.clone();
                         let clonednewLayer=newLayer.clone();

                          let history=History.create().setUndo(Callback.from(()=>{
                            workspace.replaceLayer2(clonedSelected.uuid,clonedSelected.clone());

                         }));
                         workspace.historyManager.add(history,Callback.from(()=>{
                            workspace.replaceLayer2(clonednewLayer.uuid,clonednewLayer.clone());
                         }));
                         workspace.replaceLayer2(newLayer.uuid,newLayer);
                         
                         
                       }

                }
            }



    }




}
