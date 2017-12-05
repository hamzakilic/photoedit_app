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
         
      var data= this._clipboardService.get(ClipboardData.Types.Image);
      if(data){
        this._clipboardService.remove(data);
        let newLayer=new LayerImage(data.data,'paste');
        workspace.addLayer(newLayer);
      }else{
        //belkide clipboardservice te bir şey yok diye mesaj vermek lazım
      }

           
      }
    }

  }




}
