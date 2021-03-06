import { Callback } from './../lib/callback';

import { ClipboardData } from './../services/clipboard.service';
import { LayerImage } from './../models/photoedit/layerImage';
import { ImageAlgorithmCrop } from './../lib/imagealgorithm/imageAlgorithmCrop';
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';

import { HImage } from '../lib/image';
import { LayerSelect } from '../models/photoedit/layerSelect';
import { ClipboardService } from '../services/clipboard.service';
import { ImageAlgorithmClone } from '../lib/imagealgorithm/imageAlgorithmClone';
import { Layer } from '../models/photoedit/layer';
import { History } from '../models/photoedit/history/history';



export class CmdPaste extends Command {
  zoomType: number;
  _projectService: ProjectService;
  _clipboardService:ClipboardService;
  constructor(projectService: ProjectService,clipboardService:ClipboardService) {
    super();

    this._projectService = projectService;
    this._clipboardService=clipboardService;
  }
  protected execute(): void {
    if (this._projectService.currentProject) {
      let workspace = this._projectService.currentProject.activeWorkspace;
      
      if (workspace) {
         
      let boardData= this._clipboardService.data;
      if(boardData && boardData.type==ClipboardData.Types.Image){

        let image= (boardData.data as HImage);
        let clone=new ImageAlgorithmClone();
        let cloned=clone.process(image);
        let newLayer=new LayerImage(cloned,'paste');
        workspace.addLayer(newLayer);
        this.history(workspace,newLayer.clone());
      }else{
        //belkide clipboardservice te bir şey yok diye mesaj vermek lazım
      }

           
      }
    }

  }

  private history(workspace:Workspace,layer:Layer): void {
    let history=History.create().setUndo(Callback.from(()=>{
        workspace.removeLayer2(layer.uuid);
    }));

    workspace.historyManager.add(history,Callback.from(()=>{
        workspace.addLayer(layer.clone());
    }))
}




}
